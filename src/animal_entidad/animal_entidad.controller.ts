import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalEntidadService } from './animal_entidad.service';
import { Animal_Entidad } from './animal_entidad.entity';
import { CreateAnimalEntidadDto, UpdateAnimalEntidadDto } from './animal_entidad.dto';
import { promises } from 'dns';

@Controller('animal-entidad')
export class AnimalEntidadController {
  constructor(private readonly animalEntidadService: AnimalEntidadService) {}

  @Get()
  findAll() {
    return this.animalEntidadService.findAll();
  }

  @Get(':id')
  getAnimalEntidad(@Param('id') id: string) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.getAnimalEntidad(animalEntidadId);
  }
  @Post()
  createAnimalEntidad(@Body() createAnimalEntidadDto: CreateAnimalEntidadDto) {
    return this.animalEntidadService.createAnimalEntidad(createAnimalEntidadDto);
  }

  @Put(':id')
  updateAnimalEntidad(@Param('id') id: string, @Body() updateAnimalEntidadDto: UpdateAnimalEntidadDto) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.updateAnimalEntidad({
      ...updateAnimalEntidadDto,
      id_animal_entidad: animalEntidadId,
    });
  }
  
  @Delete(':id')
  deleteAnimalEntidad(@Param('id') id: string) {
    const animalEntidadId = parseInt(id);
    if (isNaN(animalEntidadId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalEntidadService.deleteAnimalEntidad(animalEntidadId);
  }
}
