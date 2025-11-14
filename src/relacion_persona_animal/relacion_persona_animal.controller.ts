      import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
      import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';
  import {
    CreateRelacionPersonaAnimalDto,
    UpdateRelacionPersonaAnimalDto,
  } from './relacion_persona_animal.dto';

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

    @Post()
    createRelacion(@Body() dto: CreateRelacionPersonaAnimalDto) {
      return this.relacionService.createRelacion(dto);
    }

    @Put(':id_relacion')
      updateUser(@Param('id_relacion') id_relacion: string, @Body() dto: UpdateRelacionPersonaAnimalDto) {
        const relacionId = parseInt(id_relacion);
        if (isNaN(relacionId)) {
          throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
        }
        return this.relacionService.updateRelacion({
          ...dto,
          id_relacion: relacionId,
        });
      }

    @Delete(':id_relacion')
    deleteRelacion(@Param('id_relacion') id_relacion: string) {
      const relacionId = parseInt(id_relacion);
      if (isNaN(relacionId)) {
        throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
      }
      return this.relacionService.deleteRelacion(relacionId);
    }
  }
