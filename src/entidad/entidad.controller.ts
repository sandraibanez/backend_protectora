import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { CreateEntidadDto, UpdateEntidadDto } from './entidad.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { RolUsuario } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Entidades')
@Controller('entidades')
export class EntidadController {
  constructor(private readonly entidadService: EntidadService) {}
  
  @ApiOperation({ summary: 'Obtener todas las entidades' })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.entidadService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una entidad por ID' })
  @UseGuards(AuthGuard)
  @Get(':id')
  getEntidad(@Param('id') id: string) {
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('ID de entidad inválido', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.getEntidad(EntidadId);
  }

  @ApiOperation({ summary: 'Crear una nueva entidad (solo admin)' })
  @UseGuards(AuthGuard)
  @Post()
  createEntidad(@Body() createEntidadDto: CreateEntidadDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para crear entidades', HttpStatus.FORBIDDEN); 
    }
    return this.entidadService.createEntidad(createEntidadDto);
  }

  @ApiOperation({ summary: 'Actualizar una entidad (solo admin)' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateEntidad(@Param('id') id: string, @Body() updateEntidad: UpdateEntidadDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para actualizar entidades', HttpStatus.FORBIDDEN); 
    }
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('ID de entidad inválido', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.updateEntidad({
      ...updateEntidad,
      id: EntidadId,
    });
  }
  @ApiOperation({ summary: 'Eliminar una entidad (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteEntidad(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para eliminar entidades', HttpStatus.FORBIDDEN); 
    }
    const EntidadId = parseInt(id);
    if (isNaN(EntidadId)) {
      throw new HttpException('ID de entidad inválido', HttpStatus.BAD_REQUEST);
    }
    return this.entidadService.deleteEntidad(EntidadId);
  }
}
