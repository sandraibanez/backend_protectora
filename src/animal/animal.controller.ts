import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { AuthGuard } from 'src/authentication/auth/guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createAnimal(@Body() createAnimalDto: CreateAnimalDto, @Request() req) { 
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear animales', HttpStatus.FORBIDDEN); 
    } 
    return this.animalService.createAnimal(createAnimalDto); 
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') {
      throw new HttpException('No tienes permisos para actualizar animales', HttpStatus.FORBIDDEN);
    }

    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }

    return this.animalService.updateAnimal({
      ...updateAnimalDto,
      id_animal: animalId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteAnimal(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar animales', HttpStatus.FORBIDDEN); 
    }
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalService.deleteAnimal(animalId);
  }
}
