import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token') 
@ApiTags('Animales')
@Controller('animales')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @ApiOperation({ summary: 'Obtener todos los animales' })
  @UseGuards(AuthGuard)
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

  // OBTENER TODOS LOS ANIMALES POR PROTECTORA
  @ApiOperation({ summary: 'Obtener todos los animales de una protectora' })
  @UseGuards(AuthGuard)
  @Get('protectora/:idProtectora')
  findByProtectora( @Param('idProtectora') idProtectora: string, @Request() req ) {
    const userCurrent = req.user;

    // Si es protectora el ID debe venir del token
    if (userCurrent.rol === 'trabajador') {
      const protectoraId = userCurrent.idProtectora;

      return this.animalService.findByProtectora(protectoraId);
    }

    // Si es admin puede usar el parámetro
    if (userCurrent.rol === 'admin') {
      const protectoraId = parseInt(idProtectora);
      if (isNaN(protectoraId)) {
        throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
      }

      return this.animalService.findByProtectora(protectoraId);
    }

    // Otros roles no pueden acceder
    throw new HttpException('No tienes permisos para ver animales por protectora', HttpStatus.FORBIDDEN);
  }



  // Que se le asigna directamente a la protectora
  @ApiOperation({ summary: 'Crear un nuevo animal (solo admin y trabajador)' }) 
  @UseGuards(AuthGuard)
  @Post("post/:idProtectora")
  createAnimal(@Param('idProtectora') idProtectora: string, @Body() createAnimalDto: CreateAnimalDto, @Request() req) { 
    let userCurrent = req.user;
    if (userCurrent.rol !== 'admin' && userCurrent.rol !== 'trabajador') { 
      throw new HttpException('No tienes permisos para crear animales', HttpStatus.FORBIDDEN); 
    } 

    // Si es protectora el ID debe venir del token
    if (userCurrent.rol === 'trabajador') {
      const protectoraId = userCurrent.idProtectora;
      return this.animalService.createAnimal(protectoraId, createAnimalDto);
    }

    // Si es admin puede usar el parámetro
    if (userCurrent.rol === 'admin') {
      const protectoraId = parseInt(idProtectora);
      if (isNaN(protectoraId)) {
        throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
      }
      return this.animalService.createAnimal(protectoraId, createAnimalDto);
    }
  }

  @ApiOperation({ summary: 'Actualizar un animal por ID (admin y protectora dueña)' }) 
  @UseGuards(AuthGuard)
  @Put('put/:id')
  async updateAnimal( @Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Request() req) {
    const user = req.user;
    const animalId = parseInt(id);

    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }

    // Carga el animal para saber de que protectora es
    const animal = await this.animalService.getAnimal(animalId);
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si es protectora solo puede actualizar animales de su protectora
    if (user.rol === 'trabajador') {
      if (animal.protectora.id_protectora !== user.idProtectora) {
        throw new HttpException(
          'No puedes actualizar animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    // Si no es admin ni protectora
    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para actualizar animales', HttpStatus.FORBIDDEN);
    }

    return this.animalService.updateAnimal(animalId, updateAnimalDto);
  }

  
  @ApiOperation({ summary: 'Eliminar un animal por ID (solo admin o protectora dueña)' }) 
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteAnimal(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const animalId = parseInt(id);

    if (isNaN(animalId)) {
      throw new HttpException('Invalid animal ID', HttpStatus.BAD_REQUEST);
    }

    // Carga el animal para saber de que protectora es
    const animal = await this.animalService.getAnimal(animalId);
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si es protectora solo puede eliminar animales de su protectora
    if (user.rol === 'trabajador') {
      if (animal.protectora.id_protectora !== user.idProtectora) {
        throw new HttpException(
          'No puedes eliminar animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    // Si no es admin ni protectora
    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para eliminar animales', HttpStatus.FORBIDDEN);
    }
    
    return this.animalService.deleteAnimal(animalId);
  }
}
