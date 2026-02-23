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

  @ApiOperation({ summary: 'Obtener todos los animales de mi protectora' })
  @UseGuards(AuthGuard)
  @Get('mi-protectora')
  findMyProtectora(@Request() req) {
    const user = req.user;

    // Todos los usuarios (excepto admin) ven animales de su protectora
    // Admin necesita especificar protectora explícitamente
    if (user.rol === RolUsuario.ADMIN) {
      throw new HttpException(
        'Admin debe usar GET /animales/protectora/:idProtectora',
        HttpStatus.BAD_REQUEST
      );
    }

    const protectora = user.protectora?.id_protectora;
    if (!protectora) {
      throw new HttpException('Usuario sin protectora asignada', HttpStatus.BAD_REQUEST);
    }

    return this.animalService.findByProtectora(protectora);
  }

  @ApiOperation({ summary: 'Obtener animales de una protectora específica (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('protectora/:idProtectora')
  findByProtectora(@Param('idProtectora') idProtectora: string, @Request() req) {
    const user = req.user;

    // Solo ADMIN puede especificar protectora
    if (user.rol !== RolUsuario.ADMIN) {
      throw new HttpException(
        'No tienes permisos. Usa GET /animales/mi-protectora',
        HttpStatus.FORBIDDEN
      );
    }

    const protectora = parseInt(idProtectora);
    if (isNaN(protectora)) {
      throw new HttpException('ID de protectora inválido', HttpStatus.BAD_REQUEST);
    }
    
    return this.animalService.findByProtectora(protectora);
  }



  @ApiOperation({ summary: 'Crear un nuevo animal (solo admin y trabajador)' }) 
  @UseGuards(AuthGuard)
  @Post("post")
  createAnimal(@Body() createAnimalDto: CreateAnimalDto, @Request() req) { 
    const user = req.user;
    
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) { 
      throw new HttpException('No tienes permisos para crear animales', HttpStatus.FORBIDDEN); 
    } 

    // Trabajador: usa su protectora automáticamente
    // Admin: puede especificar protectora en el DTO o usa la de la app
    const userProtectoraId = user.protectora?.id_protectora;
    
    return this.animalService.createAnimal(createAnimalDto, userProtectoraId);
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
