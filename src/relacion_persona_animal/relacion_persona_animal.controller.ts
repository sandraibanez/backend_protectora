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

  @Get(':id')
  getRelacion(@Param('id') id: string) {
    const relacionId = parseInt(id);
    if (isNaN(relacionId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.relacionService.getRelacion(relacionId);
  }

  @Post()
  createRelacion(@Body() dto: CreateRelacionPersonaAnimalDto) {
    return this.relacionService.createRelacion(dto);
  }

  @Put()
  updateRelacion(@Body() dto: UpdateRelacionPersonaAnimalDto) {
    if (!dto.id || isNaN(dto.id)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.relacionService.updateRelacion(dto);
  }

  @Delete(':id')
  deleteRelacion(@Param('id') id: string) {
    const relacionId = parseInt(id);
    if (isNaN(relacionId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.relacionService.deleteRelacion(relacionId);
  }
}
