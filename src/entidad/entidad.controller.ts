import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { CreateEntidadDto, UpdateEntidadDto } from './entidad.dto';
import { AuthGuard } from 'src/authentication/auth/guard';

@Controller('entidades')
export class EntidadController {
  constructor(private readonly entidadService: EntidadService) {}
  
  @Get()
  findAll() {
    return this.entidadService.findAll();
  }

  @Get(':id')
  getEntidad(@Param('id') id: string) {
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('Invalid entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.getEntidad(EntidadId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createEntidad(@Body() createEntidadDto: CreateEntidadDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear entidades', HttpStatus.FORBIDDEN); 
    }
    return this.entidadService.createEntidad(createEntidadDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateEntidad(@Param('id') id: string, @Body() updateEntidad: UpdateEntidadDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar entidades', HttpStatus.FORBIDDEN); 
    }
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('Invalid entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.updateEntidad({
      ...updateEntidad,
      id: EntidadId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteEntidad(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar entidades', HttpStatus.FORBIDDEN); 
    }
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('Invalid entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.deleteEntidad(EntidadId);
  }
}
