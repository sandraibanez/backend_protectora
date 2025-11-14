import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';

@Controller('colonias')
export class ColoniaController {

  constructor(private readonly coloniaService: ColoniaService) {}

  @Get()
  findAll() {
    return this.coloniaService.findAll();
  }

  @Get(':id')
  getColonia(@Param('id') id: string) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.getColonia(coloniaId);
  }
  @Post()
  createColonia(@Body() createColoniaDto: CreateColoniaDto) {
    return this.coloniaService.createColonia(createColoniaDto);
  }

  @Put(':id')
  updateColonia(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.updateColonia({
      ...updateColoniaDto,
      id_colonia: coloniaId,
    });
  }
  
  @Delete(':id')
  deleteColonia(@Param('id') id: string) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.deleteColonia(coloniaId);
  }
}
