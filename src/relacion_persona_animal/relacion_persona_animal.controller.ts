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

    @Get()
    findAll() {
      return this.relacionService.findAll();
    }

    @Get(':id_relacion')
    getRelacion(@Param('id_relacion') id_relacion: string) {
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.getRelacion(relacionId);
    }

    @UseGuards(AuthGuard)
    @Post()
    createRelacion(@Body() dto: CreateRelacionPersonaAnimalDto, @Request() req) {
      let userCurrent = req.user.rol;
      if (userCurrent !== 'admin') { 
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
