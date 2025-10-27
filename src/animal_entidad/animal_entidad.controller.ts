import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalEntidadService } from './animal_entidad.service';
import { Animal_Entidad } from './animal_entidad.entity';
import { CreateAnimalEntidadDto, UpdateAnimalEntidad } from './animal_entidad.dto';
import { promises } from 'dns';

@Controller('animal-entidad')
export class AnimalEntidadController {
  constructor(private readonly AnimalEntidadService: AnimalEntidadService) {}

  @Get()
  findAll() {
    return this.AnimalEntidadService.findAll();
  }

  @Get(':id')
  getAnimalEntidad(@Param('id') id: string) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalEntidadService.getAnimalEntidad(animalEntidadId);
  }
  @Post()
  createAnimalEntidad(@Body() createAnimalEntidadDto: CreateAnimalEntidadDto) {
    return this.AnimalEntidadService.createAnimalEntidad(createAnimalEntidadDto);
  }

  @Put(':id')
  updateAnimalEntidad(@Param('id') id: string, @Body() updateAnimalEntidad: UpdateAnimalEntidad) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalEntidadService.updateAnimalEntidad({
      ...updateAnimalEntidad,
      id: animalEntidadId,
    });
  }
  
  @Delete(':id')
  deleteAnimalEntidad(@Param('id') id: string) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalEntidadService.deleteAnimalEntidad(animalEntidadId);
  }
}
