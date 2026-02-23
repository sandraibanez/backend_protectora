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
import { AdopcionService } from './adopcion.service';
import { CreateAdopcionDto, UpdateAdopcionDto } from './adopcion.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Adopciones')
@Controller('adopciones')
export class AdopcionController {
  constructor(private readonly adopcionService: AdopcionService) {}

  // Obtener todas las adopciones (solo admin)
  @ApiOperation({ summary: 'Obtener todas las adopciones (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para ver todas las adopciones',
        HttpStatus.FORBIDDEN
      );
    }

    return this.adopcionService.findAll();
  }

  // Obtener adopción por ID
  @ApiOperation({ summary: 'Obtener una adopción por ID' })
  @UseGuards(AuthGuard)
  @Get('get-one/:id_adopcion')
  async findOne(@Param('id_adopcion') id_adopcion: number, @Request() req) {
    const user = req.user;

    const adopcion = await this.adopcionService.findOne(id_adopcion);

    // Veterinario no puede ver adopciones
    if (user.rol === RolUsuario.VETERINARIO) {
      throw new HttpException(
        'No tienes permisos para ver adopciones',
        HttpStatus.FORBIDDEN
      );
    }

    // Cliente solo sus propias adopciones
    if (user.rol === RolUsuario.CLIENTE) {
      if (adopcion.adoptante.id_user !== user.id_user) {
        throw new HttpException(
          'No tienes permisos para ver esta adopción',
          HttpStatus.FORBIDDEN
        );
      }
    }

    // Trabajador solo adopciones de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (adopcion.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes ver adopciones de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return adopcion;
  }

  // Obtener mis solicitudes de adopción
  @ApiOperation({ summary: 'Obtener mis solicitudes de adopción' })
  @UseGuards(AuthGuard)
  @Get('get-mine')
  findMine(@Request() req) {
    const user = req.user.id_user;
    return this.adopcionService.findByUsuario(user);
  }

  // Obtener adopciones de un animal (trabajador o admin)
  @ApiOperation({ summary: 'Obtener adopciones de un animal' })
  @UseGuards(AuthGuard)
  @Get('get-animal/:id_animal')
  async findByAnimal(@Param('id_animal') id_animal: number, @Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para ver adopciones de animales',
        HttpStatus.FORBIDDEN
      );
    }

    return this.adopcionService.findByAnimal(id_animal);
  }

  // Crear solicitud de adopción (cliente, trabajador o admin)
  @ApiOperation({ summary: 'Crear una solicitud de adopción' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateAdopcionDto, @Request() req) {
    const user = req.user;

    // Solo cliente, trabajador o admin pueden crear adopciones
    if (
      user.rol !== RolUsuario.CLIENTE &&
      user.rol !== RolUsuario.TRABAJADOR &&
      user.rol !== RolUsuario.ADMIN
    ) {
      throw new HttpException(
        'No tienes permisos para crear adopciones',
        HttpStatus.FORBIDDEN
      );
    }

    // El usuario crea adopción con su ID
    dto.id_adoptante = user.id_user;

    return this.adopcionService.create(dto, user.protectora?.id_protectora);
  }

  // Actualizar adopción (trabajador o admin)
  @ApiOperation({ summary: 'Actualizar una adopción (cambiar estado, añadir notas)' })
  @UseGuards(AuthGuard)
  @Put('put/:id_adopcion')
  async update(
    @Param('id_adopcion') id_adopcion: number,
    @Body() dto: UpdateAdopcionDto,
    @Request() req
  ) {
    const user = req.user;

    // Solo trabajador o admin pueden actualizar
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para actualizar adopciones',
        HttpStatus.FORBIDDEN
      );
    }

    // Validar que trabajador solo actualiza de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      const adopcion = await this.adopcionService.findOne(id_adopcion);
      if (adopcion.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes actualizar adopciones de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return this.adopcionService.update(id_adopcion, dto);
  }

  // Eliminar adopción (solo admin)
  @ApiOperation({ summary: 'Eliminar una adopción (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_adopcion')
  async delete(@Param('id_adopcion') id_adopcion: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'Solo admin puede eliminar adopciones',
        HttpStatus.FORBIDDEN
      );
    }

    await this.adopcionService.delete(id_adopcion);
    return { message: 'Adopción eliminada correctamente' };
  }
}
