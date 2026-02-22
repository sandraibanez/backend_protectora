  import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
  import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';
  import {
    CreateRelacionPersonaAnimalDto,
    UpdateRelacionPersonaAnimalDto,
  } from './relacion_persona_animal.dto';
  import { AuthGuard } from 'src/authentication/guards/guard';
  import { RolUsuario } from 'src/user/user.entity';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

  @ApiBearerAuth('access-token')
  @ApiTags('Relación Persona-Animal')
  @Controller('relacion-persona-animal')
  export class RelacionPersonaAnimalController {
    constructor(
      private readonly relacionService: RelacionPersonaAnimalService,
    ) {}

    @ApiOperation({ summary: 'Obtener todas las relaciones persona-animal (solo admin)' })
    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req) {
      const user = req.user;
      if (user.rol !== RolUsuario.ADMIN) { 
        throw new HttpException('No tienes permisos para ver relaciones', HttpStatus.FORBIDDEN); 
      }
      return this.relacionService.findAll();
    }

    @ApiOperation({ summary: 'Obtener una relación persona-animal por ID (admin o cliente dueño)' })
    @UseGuards(AuthGuard)
    @Get(':id_relacion')
    async getRelacion(@Param('id_relacion') id_relacion: string, @Request() req) {
      const user = req.user; 
      if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.CLIENTE) { 
        throw new HttpException('No tienes permisos para ver relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion); 
      if (isNaN(relacionId)) { 
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST); 
      }

      const relacion = await this.relacionService.getRelacion(relacionId); 

      // Cliente solo puede ver sus propias relaciones 
      if (user.rol === RolUsuario.CLIENTE && relacion.persona.id_user !== user.id_user) { 
        throw new HttpException('No tienes permisos para ver esta relación', HttpStatus.FORBIDDEN); 
      }
      return relacion;
    }

    @ApiOperation({ summary: 'Crear una nueva relación persona-animal (admin o cliente)' })
    @UseGuards(AuthGuard)
    @Post()
    createRelacion(@Body() dto: CreateRelacionPersonaAnimalDto, @Request() req) {
      const user = req.user;
      
      if (user.rol === RolUsuario.CLIENTE) { 
        dto.persona = user.id_user; 
      } else if (user.rol !== RolUsuario.ADMIN) { 
        throw new HttpException('No tienes permisos para crear relaciones', HttpStatus.FORBIDDEN); 
      }

      return this.relacionService.createRelacion(dto);
    }

    @ApiOperation({ summary: 'Actualizar una relación persona-animal (solo admin)' })
    @UseGuards(AuthGuard)
    @Put(':id_relacion')
    updateUser(@Param('id_relacion') id_relacion: string, @Body() dto: UpdateRelacionPersonaAnimalDto, @Request() req) {
      const user = req.user;
      if (user.rol !== RolUsuario.ADMIN) { 
        throw new HttpException('No tienes permisos para actualizar relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.updateRelacion({
        ...dto,
        id_relacion: relacionId,
      });
    }

    @ApiOperation({ summary: 'Eliminar una relación persona-animal (solo admin)' })
    @UseGuards(AuthGuard)
    @Delete(':id_relacion')
    deleteRelacion(@Param('id_relacion') id_relacion: string, @Request() req) {
      const user = req.user;
      if (user.rol !== RolUsuario.ADMIN) { 
        throw new HttpException('No tienes permisos para eliminar relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.deleteRelacion(relacionId);
    }
  }
