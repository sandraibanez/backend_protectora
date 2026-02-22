import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto, UpdateGastoDto } from './gasto.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { RolUsuario } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Gastos')
@Controller('gastos')
export class GastoController {
  constructor(private readonly gastoService: GastoService) {}

  @ApiOperation({ summary: 'Obtener todos los gastos (admin ve todos, trabajador solo su protectora)' })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    
    // Admin puede ver todos los gastos
    if (user.rol === RolUsuario.ADMIN) {
      return this.gastoService.findAll();
    }
    
    // Trabajador solo ve gastos de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      return this.gastoService.findByProtectora(user.protectora.id_protectora);
    }

    throw new HttpException('No tienes permisos para ver gastos', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Obtener un gasto por ID (con validación multi-tenant)' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getGasto(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const gastoId = parseInt(id);
    
    if (isNaN(gastoId)) {
      throw new HttpException('ID de gasto inválido', HttpStatus.BAD_REQUEST);
    }

    const gasto = await this.gastoService.getGasto(gastoId);

    // Admin puede ver cualquier gasto
    if (user.rol === RolUsuario.ADMIN) {
      return gasto;
    }

    // Trabajador solo puede ver gastos de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (gasto.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No tienes permisos para ver gastos de otra protectora', HttpStatus.FORBIDDEN);
      }
      return gasto;
    }

    throw new HttpException('No tienes permisos para ver gastos', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Crear un nuevo gasto (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Post()
  createGasto(@Body() createGastoDto: CreateGastoDto, @Request() req) {
    const user = req.user;
    
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para crear gastos', HttpStatus.FORBIDDEN);
    }

    // Trabajador solo puede crear gastos para su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      createGastoDto.protectora = user.protectora.id_protectora;
    }

    return this.gastoService.createGasto(createGastoDto);
  }

  @ApiOperation({ summary: 'Actualizar un gasto (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateGasto(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto, @Request() req) {
    const user = req.user;
    const gastoId = parseInt(id);
    
    if (isNaN(gastoId)) {
      throw new HttpException('ID de gasto inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para actualizar gastos', HttpStatus.FORBIDDEN);
    }

    // Validar que el gasto pertenece a la protectora del trabajador
    const gasto = await this.gastoService.getGasto(gastoId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (gasto.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes actualizar gastos de otra protectora', HttpStatus.FORBIDDEN);
      }
      // Evitar que cambie la protectora
      updateGastoDto.protectora = user.protectora.id_protectora;
    }

    return this.gastoService.updateGasto({
      ...updateGastoDto,
      id_gasto: gastoId,
    });
  }

  @ApiOperation({ summary: 'Eliminar un gasto (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteGasto(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const gastoId = parseInt(id);
    
    if (isNaN(gastoId)) {
      throw new HttpException('ID de gasto inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para eliminar gastos', HttpStatus.FORBIDDEN);
    }

    // Validar que el gasto pertenece a la protectora del trabajador
    const gasto = await this.gastoService.getGasto(gastoId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (gasto.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes eliminar gastos de otra protectora', HttpStatus.FORBIDDEN);
      }
    }

    return this.gastoService.deleteGasto(gastoId);
  }
}
