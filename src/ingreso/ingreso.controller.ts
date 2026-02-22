import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto, UpdateIngresoDto } from './ingreso.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { RolUsuario } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Ingresos')
@Controller('ingresos')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}

  @ApiOperation({ summary: 'Obtener todos los ingresos (admin ve todos, trabajador solo su protectora)' })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    
    // Admin puede ver todos los ingresos
    if (user.rol === RolUsuario.ADMIN) {
      return this.ingresoService.findAll();
    }
    
    // Trabajador solo ve ingresos de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      return this.ingresoService.findByProtectora(user.protectora.id_protectora);
    }

    throw new HttpException('No tienes permisos para ver ingresos', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Obtener un ingreso por ID (con validación multi-tenant)' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getIngreso(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const ingresoId = parseInt(id);
    
    if (isNaN(ingresoId)) {
      throw new HttpException('ID de ingreso inválido', HttpStatus.BAD_REQUEST);
    }

    const ingreso = await this.ingresoService.getIngreso(ingresoId);

    // Admin puede ver cualquier ingreso
    if (user.rol === RolUsuario.ADMIN) {
      return ingreso;
    }

    // Trabajador solo puede ver ingresos de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (ingreso.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No tienes permisos para ver ingresos de otra protectora', HttpStatus.FORBIDDEN);
      }
      return ingreso;
    }

    throw new HttpException('No tienes permisos para ver ingresos', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Crear un nuevo ingreso (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Post()
  createIngreso(@Body() createIngresoDto: CreateIngresoDto, @Request() req) {
    const user = req.user;
    
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para crear ingresos', HttpStatus.FORBIDDEN);
    }

    // Trabajador solo puede crear ingresos para su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      createIngresoDto.protectora = user.protectora.id_protectora;
    }

    return this.ingresoService.createIngreso(createIngresoDto);
  }

  @ApiOperation({ summary: 'Actualizar un ingreso (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateIngreso(@Param('id') id: string, @Body() updateIngresoDto: UpdateIngresoDto, @Request() req) {
    const user = req.user;
    const ingresoId = parseInt(id);

    if (isNaN(ingresoId)) {
      throw new HttpException('ID de ingreso inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para actualizar ingresos', HttpStatus.FORBIDDEN);
    }

    // Validar que el ingreso pertenece a la protectora del trabajador
    const ingreso = await this.ingresoService.getIngreso(ingresoId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (ingreso.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes actualizar ingresos de otra protectora', HttpStatus.FORBIDDEN);
      }
      // Evitar que cambie la protectora
      updateIngresoDto.protectora = user.protectora.id_protectora;
    }

    return this.ingresoService.updateIngreso({
      ...updateIngresoDto,
      id_ingreso: ingresoId,
    });
  }
  
  @ApiOperation({ summary: 'Eliminar un ingreso (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteIngreso(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const ingresoId = parseInt(id);
    
    if (isNaN(ingresoId)) {
      throw new HttpException('ID de ingreso inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para eliminar ingresos', HttpStatus.FORBIDDEN);
    }

    // Validar que el ingreso pertenece a la protectora del trabajador
    const ingreso = await this.ingresoService.getIngreso(ingresoId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (ingreso.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes eliminar ingresos de otra protectora', HttpStatus.FORBIDDEN);
      }
    }

    return this.ingresoService.deleteIngreso(ingresoId);
  }
}
