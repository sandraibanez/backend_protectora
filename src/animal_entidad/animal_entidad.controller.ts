import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AnimalEntidadService } from './animal_entidad.service';
import { CreateAnimalEntidadDto, UpdateAnimalEntidadDto } from './animal_entidad.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnimalService } from 'src/animal/animal.service';

@ApiBearerAuth('access-token')
@ApiTags('Animal-Entidad') 
@Controller('animal-entidad')
export class AnimalEntidadController {
  constructor(
    private readonly animalEntidadService: AnimalEntidadService,
    private readonly animalService: AnimalService
  ) {}

  // Mostrar la entidad de un animal
  @ApiOperation({ summary: 'Obtener todas las relaciones Animal-Entidad de un animal' })
  @UseGuards(AuthGuard)
  @Get('animal/:idAnimal')
  async getRelacionesPorAnimal( @Param('idAnimal') idAnimal: string, @Request() req ) {
    const user = req.user;
    const animalId = parseInt(idAnimal);

    if (isNaN(animalId)) {
      throw new HttpException('ID de animal inválido', HttpStatus.BAD_REQUEST);
    }

    // Si es protectora solo puede ver animales suyos
    const animal = await this.animalService.getAnimal(animalId);
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    if (user.rol === 'trabajador' && animal.protectora.id_protectora !== user.protectora.id_protectora) {
      throw new HttpException('No puedes ver relaciones de animales de otra protectora', HttpStatus.FORBIDDEN);
    }

    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para ver relaciones Animal-Entidad', HttpStatus.FORBIDDEN);
    }

    return this.animalEntidadService.getRelacionesPorAnimal(animalId);
  }


  @ApiOperation({ summary: 'Crear una nueva relación Animal-Entidad (admin o trabajador)' })
  @UseGuards(AuthGuard)
  @Post("post")
  async createAnimalEntidad( @Body() createAnimalEntidadDto: CreateAnimalEntidadDto, @Request() req ) {
    const user = req.user;

    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para crear relaciones Animal-Entidad', HttpStatus.FORBIDDEN);
    
    }

    // Si es protectora validar que el animal es suyo
    if (user.rol === 'trabajador') {
      const animal = await this.animalService.getAnimal(createAnimalEntidadDto.animal);

      if (animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes crear relaciones para animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    return this.animalEntidadService.createAnimalEntidad(createAnimalEntidadDto);
  }

  @ApiOperation({ summary: 'Actualizar una relación Animal-Entidad por ID (admin o trabajador)' })
  @UseGuards(AuthGuard)
  @Put('put/:id')
  async updateAnimalEntidad( @Param('id') id: string, @Body() updateAnimalEntidadDto: UpdateAnimalEntidadDto, @Request() req
  ) {
    const user = req.user;
    const relacionId = parseInt(id);

    if (isNaN(relacionId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }

    const relacion = await this.animalEntidadService.getAnimalEntidad(relacionId);

    // Si es protectora validar que el animal es suyo
    if (user.rol === 'trabajador') {
      if (relacion.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes actualizar relaciones de animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para actualizar relaciones Animal-Entidad', HttpStatus.FORBIDDEN);
    }

    return this.animalEntidadService.updateAnimalEntidad(relacionId, updateAnimalEntidadDto);
  }
  
  @ApiOperation({ summary: 'Eliminar una relación Animal-Entidad por ID (admin o trabajador)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteAnimalEntidad( @Param('id') id: string, @Request() req ) {
    const user = req.user;
    const relacionId = parseInt(id);

    if (isNaN(relacionId)) {
      throw new HttpException('Invalid animal-entidad ID', HttpStatus.BAD_REQUEST);
    }

    const relacion = await this.animalEntidadService.getAnimalEntidad(relacionId);

    // Si es protectora validar que el animal es suyo
    if (user.rol === 'trabajador') {
      if (relacion.animal.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes eliminar relaciones de animales de otra protectora', HttpStatus.FORBIDDEN
        );
      }
    }

    if (user.rol !== 'admin' && user.rol !== 'trabajador') {
      throw new HttpException('No tienes permisos para eliminar relaciones Animal-Entidad', HttpStatus.FORBIDDEN);
    }
    return this.animalEntidadService.deleteAnimalEntidad(relacionId);
  }
}
