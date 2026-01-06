import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto, UpdateIngresoDto } from './ingreso.dto';
import { AuthGuard } from 'src/authentication/auth/guard';

@Controller('ingresos')
export class IngresoController {
  // IngresoService: any;
  constructor(private readonly ingresoService: IngresoService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver ingresos', HttpStatus.FORBIDDEN); 
    }
    return this.ingresoService.findAll();
  }

  @Get(':id')
  getIngreso(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver ingresos', HttpStatus.FORBIDDEN); 
    }
    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.getIngreso(ingresoId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createIngreso(@Body() createIngresoDto: CreateIngresoDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear ingresos', HttpStatus.FORBIDDEN); 
    }
    return this.ingresoService.createIngreso(createIngresoDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateIngreso(@Param('id') id: string, @Body() updateIngresoDto: UpdateIngresoDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar ingresos', HttpStatus.FORBIDDEN); 
    }

    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.updateIngreso({
      ...updateIngresoDto,
      id_ingreso: ingresoId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteIngreso(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar ingresos', HttpStatus.FORBIDDEN); 
    }
    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingresos ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.deleteIngreso(ingresoId);
  }
}
