import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ColoniasService } from './colonias.service';
import { CreateMedicacionDto, UpdateMedicacion } from 'src/medicacion/medicacion.dto';
import { CreateColoniaDto, UpdateColonia } from './colonia.dto';

@Controller('colonias')
export class ColoniasController {
  ColoniasService: any;
  constructor(private readonly ColoniaService: ColoniasService) {}

  @Get()
  findAll() {
    return this.ColoniaService.findAll();
  }

  @Get(':id')
  getColonia(@Param('id') id: string) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.ColoniaService.getColonia(coloniaId);
  }
  @Post()
  createColonia(@Body() createColoniaDto: CreateColoniaDto) {
    return this.ColoniaService.createColonia(createColoniaDto);
  }

  @Put(':id')
  updateColonia(@Param('id') id: string, @Body() updateColonia: UpdateColonia) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.ColoniaService.updateColonia({
      ...updateColonia,
      id: coloniaId,
    });
  }
  
  @Delete(':id')
  deleteColonia(@Param('id') id: string) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.ColoniaService.deleteColonia(coloniaId);
  }
}
