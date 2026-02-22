import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token') 
@ApiTags('Animales')
@Controller('animales')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @ApiOperation({ summary: 'Obtener todos los animales (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos para ver todos los animales',
        HttpStatus.FORBIDDEN
      );
    }

    return this.animalService.findAll();
  }


  @ApiOperation({ summary: 'Obtener un animal por ID' })
  @UseGuards(AuthGuard)
  @Get('get/:id')
  async getAnimal(@Param('id') id: string, @Request() req) {
    const user = req.user;

    const animalId = parseInt(id);
    if (isNaN(animalId)) {
      throw new HttpException('ID de animal inválido', HttpStatus.BAD_REQUEST);
    }

    const animal = await this.animalService.getAnimal(animalId);

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    // Admin puede ver cualquier animal
    if (user.rol === RolUsuario.ADMIN) {
      return animal;
    }

    // Todos los demás solo pueden ver animales de su protectora
    if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
      throw new HttpException(
        'No tienes permisos para ver animales de otra protectora',
        HttpStatus.FORBIDDEN
      );
    }

    return animal;
  }

  @ApiOperation({ summary: 'Obtener todos los animales de una protectora' })
  @UseGuards(AuthGuard)
  @Get('protectora/:idProtectora')
  findByProtectora(@Param('idProtectora') idProtectora: string, @Request() req) {
    const user = req.user;

    // ADMIN puede ver cualquier protectora
    if (user.rol === RolUsuario.ADMIN) {
      const protectora = parseInt(idProtectora);
      if (isNaN(protectora)) {
        throw new HttpException('ID de protectora inválido', HttpStatus.BAD_REQUEST);
      }
      return this.animalService.findByProtectora(protectora);
    }

    // CLIENTE, TRABAJADOR, VETERINARIO solo su protectora
    const protectora = user.protectora.id_protectora;

    return this.animalService.findByProtectora(protectora);
  }



  // Que se le asigna directamente a la protectora
  @ApiOperation({ summary: 'Crear un nuevo animal (solo admin y trabajador)' }) 
  @UseGuards(AuthGuard)
  @Post("post/:id_protectora")
  createAnimal(@Param('id_protectora') id_protectora: string, @Body() createAnimalDto: CreateAnimalDto, @Request() req) { 
    let userCurrent = req.user;
    if (userCurrent.rol !== RolUsuario.ADMIN && userCurrent.rol !==  RolUsuario.TRABAJADOR) { 
      throw new HttpException('No tienes permisos para crear animales', HttpStatus.FORBIDDEN); 
    } 

    // Si es protectora el ID debe venir del token
    if (userCurrent.rol ===  RolUsuario.TRABAJADOR) {
      const protectora = userCurrent.protectora.id_protectora;
      return this.animalService.createAnimal(protectora, createAnimalDto);
    }

    // Si es admin puede usar el parámetro
    if (userCurrent.rol === RolUsuario.ADMIN) {
      const protectora = parseInt(id_protectora);
      if (isNaN(protectora)) {
        throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
      }
      return this.animalService.createAnimal(protectora, createAnimalDto);
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
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes actualizar animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    // Si no es admin ni protectora
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
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
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes eliminar animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    // Si no es admin ni protectora
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para eliminar animales', HttpStatus.FORBIDDEN);
    }
    
    return this.animalService.deleteAnimal(animalId);
  }
}
