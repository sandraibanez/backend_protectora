import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';

@Controller('animales')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  getAnimal(@Param('id') id: string) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalService.getAnimal(animalId);
  }
  @Post()
  createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.createAnimal(createAnimalDto);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalService.updateAnimal({
      ...updateAnimalDto,
      id_animal: animalId,
    });
  }
  
  @Delete(':id')
  deleteAnimal(@Param('id') id: string) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalService.deleteAnimal(animalId);
  }
}
