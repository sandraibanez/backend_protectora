import { Body, Controller, Delete, Get, HttpException, UseGuards, Request, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { AnimalVeterinarioService } from './animal_veterinario.service';
import { CreateAnimalVeterinarioDto, UpdateAnimalVeterinarioDto } from './animal_veterinario.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Animal-Veterinario') 
@Controller('animal-veterinario')
export class AnimalVeterinarioController {
  constructor(private readonly AnimalVeterinarioService: AnimalVeterinarioService) {}

  @ApiOperation({ summary: 'Obtener todas las consultas veterinarias registradas (solo admin)' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para ver animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    return this.AnimalVeterinarioService.findAll();
  }

  @ApiOperation({ summary: 'Obtener todas las consultas veterinarias de un animal (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get('get/animal/:idAnimal')
  getConsultasPorAnimal(
    @Param('idAnimal') idAnimal: string,
    @Request() req
  ) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para ver consultas por animal', HttpStatus.FORBIDDEN);
    }

    const animalId = parseInt(idAnimal);
    if (isNaN(animalId)) {
      throw new HttpException('ID de animal inválido', HttpStatus.BAD_REQUEST);
    }

    return this.AnimalVeterinarioService.getConsultasPorAnimal(animalId);
  }

  @ApiOperation({ summary: 'Obtener todas las consultas realizadas por un veterinario (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get('get/veterinario/:id')
  getConsultasPorVeterinario(
    @Param('idVet') idVet: string,
    @Request() req
  ) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para ver consultas por veterinario', HttpStatus.FORBIDDEN);
    }

    const vetId = parseInt(idVet);
    if (isNaN(vetId)) {
      throw new HttpException('ID de veterinario inválido', HttpStatus.BAD_REQUEST);
    }

    return this.AnimalVeterinarioService.getConsultasPorVeterinario(vetId);
  }


  @ApiOperation({ summary: 'Registrar una nueva consulta veterinaria para un animal (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Post("post")
  createAnimalVeterinario(@Body() createAnimalVeterinarioDto: CreateAnimalVeterinarioDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
       throw new HttpException('No tienes permisos para crear animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    return this.AnimalVeterinarioService.createAnimalVeterinario(createAnimalVeterinarioDto);
  }

  @ApiOperation({ summary: 'Actualizar los datos de una consulta veterinaria (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Put('put/:id')
  updateAnimalVeterinario(@Param('id') id: string, @Body() updateAnimalVeterinario: UpdateAnimalVeterinarioDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para actualizar animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('ID de animal-veterinario inválido', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.updateAnimalVeterinario(
      animalVeterinarioId, updateAnimalVeterinario,
    );
  }
  
  @ApiOperation({ summary: 'Eliminar una consulta veterinaria (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteAnimalVeterinario(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes permisos para eliminar animal-veterinario', HttpStatus.FORBIDDEN); 
    }
    const animalVeterinarioId = parseInt(id);
    if (isNaN(animalVeterinarioId)) {
      throw new HttpException('ID de animal-veterinario inválido', HttpStatus.BAD_REQUEST);
    }
    return this.AnimalVeterinarioService.deleteAnimalVeterinario(animalVeterinarioId);
  }
}
