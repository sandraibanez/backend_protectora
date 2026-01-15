import { Body, Controller, Delete, Get, HttpException, UseGuards, Request, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalVeterinarioService } from './animal_veterinario.service';
import { AnimalVeterinario } from './animal_veterinario.entity';
import { CreateAnimalVeterinarioDto, UpdateAnimalVeterinarioDto } from './animal_veterinario.dto';
import { promises } from 'dns';
import { AuthGuard } from 'src/authentication/guards/guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createAnimalVeterinario(@Body() createAnimalVeterinarioDto: CreateAnimalVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
       throw new HttpException('No tienes permisos para crear animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    return this.AnimalVeterinarioService.createAnimalVeterinario(createAnimalVeterinarioDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateAnimalVeterinario(@Param('id') id: string, @Body() updateAnimalVeterinario: UpdateAnimalVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para actualizar animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('Invalid animal-veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.updateAnimalVeterinario({
      ...updateAnimalVeterinario,
      id_animalVeterinario: animalVeterinarioId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteAnimalVeterinario(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') {
      throw new HttpException('No tienes permisos para eliminar animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('Invalid animal-veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.deleteAnimalVeterinario(animalVeterinarioId);
  }
}
