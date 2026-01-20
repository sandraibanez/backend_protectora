import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@ApiTags('Animales')
@Controller('animales')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @ApiOperation({ summary: 'Obtener todos los animales' })
  @Get('get')
  findAll() {

    return this.animalService.findAll();

  }

  @ApiOperation({ summary: 'Obtener un animal por ID' })
  @Get('get/:id')
  getAnimal(@Param('id') id: string) {
    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }
    return this.animalService.getAnimal(animalId);
  }

  @ApiOperation({ summary: 'Crear un nuevo animal (solo admin)' })
  @ApiConsumes('application/x-www-form-urlencoded') 
  @UseGuards(AuthGuard)
  @Post("post")
  createAnimal(@Body() createAnimalDto: CreateAnimalDto, @Request() req) { 
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear animales', HttpStatus.FORBIDDEN); 
    } 
    return this.animalService.createAnimal(createAnimalDto); 
  }

  @ApiOperation({ summary: 'Actualizar un animal por ID (solo admin)' })
  @ApiConsumes('application/x-www-form-urlencoded') 
  @UseGuards(AuthGuard)
  @Put('put/:id')
  updateAnimal(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') {
      throw new HttpException('No tienes permisos para actualizar animales', HttpStatus.FORBIDDEN);
    }

    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }

    return this.animalService.updateAnimal(animalId, updateAnimalDto);

  }
  
  @ApiOperation({ summary: 'Eliminar un animal por ID (solo admin)' })
  @ApiConsumes('application/x-www-form-urlencoded') 
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
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
