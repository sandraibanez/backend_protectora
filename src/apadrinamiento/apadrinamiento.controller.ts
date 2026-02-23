import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApadrinamientoService } from './apadrinamiento.service';
import { CreateApadrinamientoDto, UpdateApadrinamientoDto } from './apadrinamiento.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Apadrinamientos')
@Controller('apadrinamientos')
export class ApadrinamientoController {
  constructor(private readonly apadrinamientoService: ApadrinamientoService) {}

  // Obtener todos los apadrinamientos (solo admin)
  @ApiOperation({ summary: 'Obtener todos los apadrinamientos (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver todos los apadrinamientos', HttpStatus.FORBIDDEN);
    }

    return this.apadrinamientoService.findAll();
  }

  // Obtener apadrinamiento por ID
  @ApiOperation({ summary: 'Obtener un apadrinamiento por ID' })
  @UseGuards(AuthGuard)
  @Get('get-one/:id_apadrinamiento')
  async findOne(@Param('id_apadrinamiento') id_apadrinamiento: number, @Request() req) {
    const user = req.user;

    const apadrinamiento = await this.apadrinamientoService.findOne(id_apadrinamiento);

    // Veterinario no puede ver apadrinamientos
    if (user.rol === RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para ver apadrinamientos', HttpStatus.FORBIDDEN);
    }

    // Cliente solo sus propios apadrinamientos
    if (user.rol === RolUsuario.CLIENTE) {
      if (apadrinamiento.usuario.id_user !== user.id_user) {
        throw new HttpException('No tienes permisos para ver este apadrinamiento', HttpStatus.FORBIDDEN);
      }
    }

    // Trabajador solo apadrinamientos de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (apadrinamiento.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes ver apadrinamientos de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return apadrinamiento;
  }

  // Obtener apadrinamientos del usuario logeado
  @ApiOperation({ summary: 'Obtener mis apadrinamientos' })
  @UseGuards(AuthGuard)
  @Get('get-mine')
  findMine(@Request() req) {
    const user = req.user.id_user;
    return this.apadrinamientoService.findByUsuario(user);
  }

  // Obtener apadrinamientos por animal (trabajador o admin)
  @ApiOperation({ summary: 'Obtener apadrinamientos de un animal' })
  @UseGuards(AuthGuard)
  @Get('get-animal/:id_animal')
  async findByAnimal(@Param('id_animal') id_animal: number, @Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver apadrinamientos de animales', HttpStatus.FORBIDDEN);
    }

    // Cargar el animal para validar protectora
    const animal = await this.apadrinamientoService.getAnimal(id_animal);

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si es trabajador validar protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes ver apadrinamientos de animales de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return this.apadrinamientoService.findByAnimal(id_animal);
  }

  // Crear apadrinamiento (cliente, trabajador o admin)
  @ApiOperation({ summary: 'Crear un apadrinamiento' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateApadrinamientoDto, @Request() req) {
    const user = req.user;

    // Solo cliente, trabajador o admin pueden crear apadrinamientos
    if (user.rol !== RolUsuario.CLIENTE && user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para crear apadrinamientos', HttpStatus.FORBIDDEN);
    }

    // El usuario crea apadrinamiento con su ID
    dto.id_user = user.id_user;

    return this.apadrinamientoService.create(dto, user.protectora?.id_protectora);
  }

  // Apadrinar con un click - Endpoint simplificado
  @ApiOperation({ summary: 'Apadrinar un animal con un click (cliente autenticado)' })
  @UseGuards(AuthGuard)
  @Post('apadrinar/:id_animal')
  async apadrinarConClick(@Param('id_animal') id_animal: number, @Request() req) {
    const user = req.user;

    // Solo cliente, trabajador o admin pueden apadrinar
    if (user.rol !== RolUsuario.CLIENTE && user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para apadrinar animales', HttpStatus.FORBIDDEN);
    }

    // Crear DTO automáticamente con datos del usuario logeado
    const dto: CreateApadrinamientoDto = {
      id_animal: Number(id_animal),
      id_user: user.id_user,
      fecha_inicio: new Date(),
      activo: true,
    };

    return this.apadrinamientoService.create(dto, user.protectora?.id_protectora);
  }

  // Actualizar apadrinamiento (solo trabajador o admin)
  @ApiOperation({ summary: 'Actualizar un apadrinamiento (solo trabajador o admin)' })
  @UseGuards(AuthGuard)
  @Put('put/:id_apadrinamiento')
  async update(
    @Param('id_apadrinamiento') id_apadrinamiento: number,
    @Body() dto: UpdateApadrinamientoDto,
    @Request() req
  ) {
    const user = req.user;

    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para actualizar apadrinamientos', HttpStatus.FORBIDDEN);
    }

    // Cargar el apadrinamiento para validar protectora
    const apadrinamiento = await this.apadrinamientoService.findOne(id_apadrinamiento);

    if (user.rol === RolUsuario.TRABAJADOR) {
      if (apadrinamiento.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes modificar apadrinamientos de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return this.apadrinamientoService.update(id_apadrinamiento, dto);
  }

  // Eliminar apadrinamiento (solo admin)
  @ApiOperation({ summary: 'Eliminar un apadrinamiento (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_apadrinamiento')
  delete(@Param('id_apadrinamiento') id_apadrinamiento: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para eliminar apadrinamientos', HttpStatus.FORBIDDEN);
    }

    return this.apadrinamientoService.delete(id_apadrinamiento);
  }
}
