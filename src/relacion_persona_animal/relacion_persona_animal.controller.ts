  import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
  import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';
  import {
    CreateRelacionPersonaAnimalDto,
    UpdateRelacionPersonaAnimalDto,
  } from './relacion_persona_animal.dto';
  import { AuthGuard } from 'src/authentication/auth/guard';

  @Controller('relacion-persona-animal')
  export class RelacionPersonaAnimalController {
    constructor(
      private readonly relacionService: RelacionPersonaAnimalService,
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req) {
      let userCurrent = req.user.rol;
      if (userCurrent !== 'admin') { 
        throw new HttpException('No tienes permisos para ver relaciones', HttpStatus.FORBIDDEN); 
      }
      return this.relacionService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id_relacion')
    async getRelacion(@Param('id_relacion') id_relacion: string, @Request() req) {
      let userCurrent = req.user; 
      if (userCurrent.rol !== 'admin' && userCurrent.rol !== 'cliente') { 
        throw new HttpException('No tienes permisos para ver relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion); 
      if (isNaN(relacionId)) { 
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST); 
      }

      const relacion = await this.relacionService.getRelacion(relacionId); 

      // Cliente solo puede ver sus propias relaciones 
      if (userCurrent.rol === 'cliente' && relacion.persona.id_user !== userCurrent.id_user) { 
        throw new HttpException('No tienes permisos para ver esta relación', HttpStatus.FORBIDDEN); 
      }
      return relacion;
    }

    @UseGuards(AuthGuard)
    @Post()
    createRelacion(@Body() dto: CreateRelacionPersonaAnimalDto, @Request() req) {
      let userCurrent = req.user;
      
      if (userCurrent.rol === 'cliente') { 
        dto.persona = userCurrent.id_user; 
      } else if (userCurrent.rol !== 'admin') { 
        throw new HttpException('No tienes permisos para crear relaciones', HttpStatus.FORBIDDEN); 
      }

      return this.relacionService.createRelacion(dto);
    }

    @UseGuards(AuthGuard)
    @Put(':id_relacion')
    updateUser(@Param('id_relacion') id_relacion: string, @Body() dto: UpdateRelacionPersonaAnimalDto, @Request() req) {
      let userCurrent = req.user.rol;
      if (userCurrent !== 'admin') { 
        throw new HttpException('No tienes permisos para actualizar relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.updateRelacion({
        ...dto,
        id_relacion: relacionId,
      });
    }

    @UseGuards(AuthGuard)
    @Delete(':id_relacion')
    deleteRelacion(@Param('id_relacion') id_relacion: string, @Request() req) {
      let userCurrent = req.user.rol;
      if (userCurrent !== 'admin') { 
        throw new HttpException('No tienes permisos para eliminar relaciones', HttpStatus.FORBIDDEN); 
      }
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.deleteRelacion(relacionId);
    }
  }
