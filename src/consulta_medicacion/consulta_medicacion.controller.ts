import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ConsultaMedicacionService } from './consulta_medicacion.service';
import { CreateConsultaMedicacionDto, UpdateConsultaMedicacionDto } from './consulta_medicacion.dto';
import { AuthGuard } from 'src/authentication/guards/guard';

@Controller('consulta-medicacion')
export class ConsultaMedicacionController {
  constructor(private readonly consultaMedicacionService: ConsultaMedicacionService) {}

  // Investigar ley de proteccion animal
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    const userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para ver administraciones de medicación', HttpStatus.FORBIDDEN);
    }
    return this.consultaMedicacionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  getConsultaMedicacion(@Param('id') id: string, @Request() req) {
    const userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para ver esta administración de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('Invalid ConsultaMedicacion ID', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.getConsultaMedicacion(consultaMedicacionId);
  }

  @UseGuards(AuthGuard)
  @Post("post")
  createConsultaMedicacion(@Body() updateConsultaMedicacionDto: CreateConsultaMedicacionDto, @Request() req) {
    const userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para registrar medicación en una consulta', HttpStatus.FORBIDDEN);
    }

    return this.consultaMedicacionService.createConsultaMedicacion(updateConsultaMedicacionDto);
  }


  @UseGuards(AuthGuard)
  @Put('put/:id')
  updateConsultaMedicacion(@Param('id') id: string, @Body() updateConsultaMedicacionDto: UpdateConsultaMedicacionDto, @Request() req) {
    const userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para actualizar administraciones de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('Invalid ConsultaMedicacion ID', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.updateConsultaMedicacion(
      consultaMedicacionId, updateConsultaMedicacionDto
    );
  }


  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteConsultaMedicacion(@Param('id') id: string, @Request() req) {
    const userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para eliminar administraciones de medicación', HttpStatus.FORBIDDEN);
    }

    const consultaMedicacionId = parseInt(id);
    if (isNaN(consultaMedicacionId)) {
      throw new HttpException('Invalid ConsultaMedicacion ID', HttpStatus.BAD_REQUEST);
    }

    return this.consultaMedicacionService.deleteConsultaMedicacion(consultaMedicacionId);
  }
}
