import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalVeterinarioService } from './animal_veterinario.service';
import { AnimalVeterinario } from './animal_veterinario.entity';
import { CreateAnimalVeterinarioDto, UpdateAnimalVeterinarioDto } from './animal_veterinario.dto';
import { promises } from 'dns';

@Controller('animal-veterinario')
export class AnimalVeterinarioController {
    

  constructor(private readonly AnimalVeterinarioService: AnimalVeterinarioService) {}

  @Get()
  findAll() {
    return this.AnimalVeterinarioService.findAll();
  }

  @Get(':id')
  getAnimalVeterinario(@Param('id') id: string) {
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('Invalid animal-veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.getAnimalVeterinario(animalVeterinarioId);
  }
  @Post()
  createAnimalVeterinario(@Body() createAnimalVeterinarioDto: CreateAnimalVeterinarioDto) {
    return this.AnimalVeterinarioService.createAnimalVeterinario(createAnimalVeterinarioDto);
  }

  @Put(':id')
  updateAnimalVeterinario(@Param('id') id: string, @Body() updateAnimalVeterinario: UpdateAnimalVeterinarioDto) {
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('Invalid animal-veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.updateAnimalVeterinario({
      ...updateAnimalVeterinario,
      id_animalVeterinario: animalVeterinarioId,
    });
  }
  
  @Delete(':id')
  deleteAnimalVeterinario(@Param('id') id: string) {
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('Invalid animal-veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.deleteAnimalVeterinario(animalVeterinarioId);
  }
}
