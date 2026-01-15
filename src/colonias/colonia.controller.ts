import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';
import { AuthGuard } from 'src/authentication/guards/guard';

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

  @UseGuards(AuthGuard)
  @Post()
  createColonia(@Body() createColoniaDto: CreateColoniaDto, @Request() req) {
  let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear colonias', HttpStatus.FORBIDDEN); 
    }
    return this.coloniaService.createColonia(createColoniaDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateColonia(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar colonias', HttpStatus.FORBIDDEN); 
    }
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.updateColonia({
      ...updateColoniaDto,
      id_colonia: coloniaId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteColonia(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar colonias', HttpStatus.FORBIDDEN); 
    }
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.deleteColonia(coloniaId);
  }
}
