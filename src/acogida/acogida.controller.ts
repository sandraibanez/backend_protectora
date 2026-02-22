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
import { AcogidaService } from './acogida.service';
import { CreateAcogidaDto, UpdateAcogidaDto } from './acogida.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Acogidas')
@Controller('acogidas')
export class AcogidaController {
  constructor(private readonly acogidaService: AcogidaService) {}

  // Obtener todas las acogidas (solo admin)
  @ApiOperation({ summary: 'Obtener todas las acogidas (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver todas las acogidas', HttpStatus.FORBIDDEN);
    }

    return this.acogidaService.findAll();
  }

  // Obtener acogida por ID
  @ApiOperation({ summary: 'Obtener una acogida por ID' })
  @UseGuards(AuthGuard)
  @Get('get-one/:id_acogida')
  async findOne(@Param('id_acogida') id_acogida: number, @Request() req) {
    const user = req.user;

    const acogida = await this.acogidaService.findOne(id_acogida);

    // Cliente solo sus propias acogidas
    if (user.rol === RolUsuario.VETERINARIO) {
        throw new HttpException('No tienes permisos para ver acogidas', HttpStatus.FORBIDDEN);
    }

    // Cliente solo sus propias acogidas
    if (user.rol === RolUsuario.CLIENTE) {
      if (acogida.usuario.id_user !== user.id_user) {
        throw new HttpException('No tienes permisos para ver esta acogida', HttpStatus.FORBIDDEN);
      }
    }

    // Trabajador solo acogidas de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (acogida.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes ver acogidas de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return acogida;
  }


  // Obtener acogidas del usuario logeado
  @ApiOperation({ summary: 'Obtener mis solicitudes de acogida' })
  @UseGuards(AuthGuard)
  @Get('get-mine')
  findMine(@Request() req) {
    const user = req.user.id_user;
    return this.acogidaService.findByUsuario(user);
  }

  // Obtener acogidas por animal (trabajador o admin)
  @ApiOperation({ summary: 'Obtener acogidas de un animal' })
  @UseGuards(AuthGuard)
  @Get('get-animal/:id_animal')
  async findByAnimal(@Param('id_animal') id_animal: number, @Request() req) {
      const user = req.user;

      // Solo trabajador o admin
      if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
          throw new HttpException('No tienes permisos para ver acogidas de animales', HttpStatus.FORBIDDEN);
      }

      // Cargar el animal para validar protectora
      const animal = await this.acogidaService.getAcogida(id_animal);

      if (!animal) {
          throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
      }

      // Si es trabajador validar protectora
      if (user.rol === RolUsuario.TRABAJADOR) {
        if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
          throw new HttpException(
              'No puedes ver acogidas de animales de otra protectora',
              HttpStatus.FORBIDDEN
          );
        }
      }

      return this.acogidaService.findByAnimal(id_animal);
  }

  // Crear solicitud de acogida (cliente, trabajador o admin)
  @ApiOperation({ summary: 'Crear una solicitud de acogida' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateAcogidaDto, @Request() req) {
    const user = req.user;

    // Solo cliente o trabajador pueden crear solicitudes
    if (user.rol !== RolUsuario.CLIENTE && user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para crear acogidas', HttpStatus.FORBIDDEN);
    }

    // El usuario solo puede crear acogidas para su protectora
    dto.id_user = user.id_user;

    return this.acogidaService.create(dto);
  }


  // Actualizar acogida (solo trabajador o admin)
  @ApiOperation({ summary: 'Actualizar una acogida (solo trabajador o admin)' })
  @UseGuards(AuthGuard)
  @Put('put/:id_acogida')
  async update(
    @Param('id_acogida') id_acogida: number,
    @Body() dto: UpdateAcogidaDto,
    @Request() req
  ) {
    const user = req.user;

    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para actualizar acogidas', HttpStatus.FORBIDDEN);
    }

    // Cargar la acogida para validar protectora
    const acogida = await this.acogidaService.findOne(id_acogida);

    if (user.rol === RolUsuario.TRABAJADOR) { 
        if (acogida.animal.protectora.id_protectora !== user.protectora.id_protectora) { 
            throw new HttpException( 'No puedes modificar acogidas de otra protectora', HttpStatus.FORBIDDEN ); 
        } 
    }

    return this.acogidaService.update(id_acogida, dto);
  }

  // Eliminar acogida (solo admin)
  @ApiOperation({ summary: 'Eliminar una acogida (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_acogida')
  delete(@Param('id_acogida') id_acogida: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para eliminar acogidas', HttpStatus.FORBIDDEN);
    }

    return this.acogidaService.delete(id_acogida);
  }
}
