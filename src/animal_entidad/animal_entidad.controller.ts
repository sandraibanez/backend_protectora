import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AnimalEntidadService } from './animal_entidad.service';
import { Animal_Entidad } from './animal_entidad.entity';
import { CreateAnimalEntidadDto, UpdateAnimalEntidadDto } from './animal_entidad.dto';
import { AuthGuard } from 'src/authentication/auth/guard';
import { promises } from 'dns';

@Controller('animal-entidad')
export class AnimalEntidadController {
  constructor(private readonly animalEntidadService: AnimalEntidadService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver animal-entidad', HttpStatus.FORBIDDEN); 
    }
    return this.animalEntidadService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getAnimalEntidad(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver animal-entidad', HttpStatus.FORBIDDEN); 
    }
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.getAnimalEntidad(animalEntidadId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createAnimalEntidad(@Body() createAnimalEntidadDto: CreateAnimalEntidadDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear animal-entidad', HttpStatus.FORBIDDEN); 
    }
    
    return this.animalEntidadService.createAnimalEntidad(createAnimalEntidadDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateAnimalEntidad(@Param('id') id: string, @Body() updateAnimalEntidadDto: UpdateAnimalEntidadDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar animal-entidad', HttpStatus.FORBIDDEN); 
    }
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.updateAnimalEntidad({
      ...updateAnimalEntidadDto,
      id_animal_entidad: animalEntidadId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteAnimalEntidad(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') {
      throw new HttpException('No tienes permisos para eliminar animal-entidad', HttpStatus.FORBIDDEN); 
    }
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.deleteAnimalEntidad(animalEntidadId);
  }
}
