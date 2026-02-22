import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ConsultaMedicacionService } from './consulta_medicacion.service';
import { CreateConsultaMedicacionDto, UpdateConsultaMedicacionDto } from './consulta_medicacion.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { RolUsuario } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Consulta-Medicación')
@Controller('consulta-medicacion')
export class ConsultaMedicacionController {
  constructor(private readonly consultaMedicacionService: ConsultaMedicacionService) {}

  // Investigar ley de proteccion animal
  @ApiOperation({ summary: 'Obtener todas las administraciones de medicación (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para ver administraciones de medicación', HttpStatus.FORBIDDEN);
    }
    return this.consultaMedicacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una administración de medicación por ID (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get('get/:id')
  getConsultaMedicacion(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para ver esta administración de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('ID de consulta medicación inválido', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.getConsultaMedicacion(consultaMedicacionId);
  }

  @ApiOperation({ summary: 'Crear una administración de medicación en consulta (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Post("post")
  createConsultaMedicacion(@Body() updateConsultaMedicacionDto: CreateConsultaMedicacionDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para registrar medicación en una consulta', HttpStatus.FORBIDDEN);
    }

    return this.consultaMedicacionService.createConsultaMedicacion(updateConsultaMedicacionDto);
  }

  @ApiOperation({ summary: 'Actualizar una administración de medicación (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Put('put/:id')
  updateConsultaMedicacion(@Param('id') id: string, @Body() updateConsultaMedicacionDto: UpdateConsultaMedicacionDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para actualizar administraciones de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('ID de consulta medicación inválido', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.updateConsultaMedicacion(
      consultaMedicacionId, updateConsultaMedicacionDto
    );
  }

  @ApiOperation({ summary: 'Eliminar una administración de medicación (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteConsultaMedicacion(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para eliminar administraciones de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('ID de consulta medicación inválido', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.deleteConsultaMedicacion(consultaMedicacionId);
  }
}
