import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { CreateEntidadDto, UpdateEntidadDto } from './entidad.dto';

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
  @Post()
  createEntidad(@Body() createEntidadDto: CreateEntidadDto) {
    return this.entidadService.createEntidad(createEntidadDto);
  }

  @Put(':id')
  updateEntidad(@Param('id') id: string, @Body() updateEntidad: UpdateEntidadDto) {
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('Invalid entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.updateEntidad({
      ...updateEntidad,
      id: EntidadId,
    });
  }
  
  @Delete(':id')
  deleteEntidad(@Param('id') id: string) {
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('Invalid entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.deleteEntidad(EntidadId);
  }
}
