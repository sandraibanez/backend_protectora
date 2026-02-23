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
import { HistorialMedicoService } from './historial_medico.service';
import { CreateHistorialMedicoDto, UpdateHistorialMedicoDto } from './historial_medico.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Historial Médico')
@Controller('historial-medico')
export class HistorialMedicoController {
  constructor(private readonly historialService: HistorialMedicoService) {}

  // Obtener todos los registros (solo admin)
  @ApiOperation({ summary: 'Obtener todos los registros médicos (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para ver todos los registros médicos',
        HttpStatus.FORBIDDEN
      );
    }

    return this.historialService.findAll();
  }

  // Obtener un registro por ID
  @ApiOperation({ summary: 'Obtener un registro médico por ID' })
  @UseGuards(AuthGuard)
  @Get('get-one/:id_registro')
  async findOne(@Param('id_registro') id_registro: number, @Request() req) {
    const user = req.user;

    const registro = await this.historialService.findOne(id_registro);

    // Veterinario solo puede ver sus propios registros
    if (user.rol === RolUsuario.VETERINARIO) {
      if (registro.veterinario.id_user !== user.id_user) {
        throw new HttpException(
          'No tienes permisos para ver este registro médico',
          HttpStatus.FORBIDDEN
        );
      }
    }

    // Trabajador solo registros de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (registro.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes ver registros médicos de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return registro;
  }

  // Obtener historial médico de un animal
  @ApiOperation({ summary: 'Obtener historial médico de un animal' })
  @UseGuards(AuthGuard)
  @Get('get-animal/:id_animal')
  async findByAnimal(@Param('id_animal') id_animal: number, @Request() req) {
    const user = req.user;

    // Solo veterinarios, trabajadores y admin
    if (
      user.rol !== RolUsuario.VETERINARIO &&
      user.rol !== RolUsuario.TRABAJADOR &&
      user.rol !== RolUsuario.ADMIN
    ) {
      throw new HttpException(
        'No tienes permisos para ver historiales médicos',
        HttpStatus.FORBIDDEN
      );
    }

    return this.historialService.findByAnimal(id_animal);
  }

  // Obtener animales en tratamiento activo
  @ApiOperation({ summary: 'Obtener animales que están actualmente en tratamiento' })
  @UseGuards(AuthGuard)
  @Get('get-en-tratamiento')
  async findAnimalesEnTratamiento(@Request() req) {
    const user = req.user;

    // Solo veterinarios, trabajadores y admin
    if (
      user.rol !== RolUsuario.VETERINARIO &&
      user.rol !== RolUsuario.TRABAJADOR &&
      user.rol !== RolUsuario.ADMIN
    ) {
      throw new HttpException(
        'No tienes permisos para ver esta información',
        HttpStatus.FORBIDDEN
      );
    }

    // Si es trabajador o veterinario, filtrar por su protectora
    const idProtectora =
      user.rol === RolUsuario.ADMIN ? undefined : user.protectora?.id_protectora;

    return this.historialService.findAnimalesEnTratamiento(idProtectora);
  }

  // Crear registro médico (solo veterinarios)
  @ApiOperation({ summary: 'Crear un nuevo registro médico (solo veterinarios)' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateHistorialMedicoDto, @Request() req) {
    const user = req.user;

    if (user.rol !== RolUsuario.VETERINARIO && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'Solo veterinarios pueden crear registros médicos',
        HttpStatus.FORBIDDEN
      );
    }

    // Veterinario crea registro con su propio ID
    if (user.rol === RolUsuario.VETERINARIO) {
      dto.id_veterinario = user.id_user;
    }

    return this.historialService.create(dto, user.protectora?.id_protectora);
  }

  // Actualizar registro médico
  @ApiOperation({ summary: 'Actualizar un registro médico' })
  @UseGuards(AuthGuard)
  @Put('put/:id_registro')
  async update(
    @Param('id_registro') id_registro: number,
    @Body() dto: UpdateHistorialMedicoDto,
    @Request() req
  ) {
    const user = req.user;

    if (user.rol !== RolUsuario.VETERINARIO && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para actualizar registros médicos',
        HttpStatus.FORBIDDEN
      );
    }

    // Validar que el veterinario solo pueda editar sus propios registros
    if (user.rol === RolUsuario.VETERINARIO) {
      const registro = await this.historialService.findOne(id_registro);
      if (registro.veterinario.id_user !== user.id_user) {
        throw new HttpException(
          'Solo puedes editar tus propios registros médicos',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return this.historialService.update(id_registro, dto);
  }

  // Eliminar registro médico (solo admin)
  @ApiOperation({ summary: 'Eliminar un registro médico (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_registro')
  async delete(@Param('id_registro') id_registro: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'Solo admin puede eliminar registros médicos',
        HttpStatus.FORBIDDEN
      );
    }

    await this.historialService.delete(id_registro);
    return { message: 'Registro médico eliminado correctamente' };
  }
}
