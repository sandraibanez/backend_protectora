import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { Animales } from './animales.entity';
import { UsersService } from 'src/users/users.service';
import { CreateAnimalDto, UpdateAnimales } from './animales.dto';
import { promises } from 'dns';
@Controller('animales')
export class AnimalesController {
  constructor(private readonly AnimalesService: AnimalesService) {}

  @Get()
  findAll() {
    return this.AnimalesService.findAll();
  }

  @Get(':id')
  getAnimal(@Param('id') id: string) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalesService.getAnimal(animalId);
  }
  @Post()
  createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return this.AnimalesService.createAnimal(createAnimalDto);
  }

  @Put(':id')
  updateAnimal(@Param('id') id: string, @Body() updateAnimal: UpdateAnimales) {
    const Animal_id = parseInt(id);
    if (isNaN(Animal_id)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalesService.updateAnimal({
      ...updateAnimal,
      id: Animal_id,
    });
  }
  
  @Delete(':id')
  deleteAnimal(@Param('id') id: string) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalesService.deleteAnimal(animalId);
  }
}
