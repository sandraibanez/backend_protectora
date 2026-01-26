import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Animal-Veterinario') 
@Controller('colonias')
export class ColoniaController {
  constructor(private readonly coloniaService: ColoniaService) {}

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    return this.coloniaService.findAll();
  }

  // Falta get con informacion limitada

  // Falta get decolonias por protectora

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Get('get/:id')
  getColonia(@Param('id') id: string, @Request() req) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.getColonia(coloniaId);
  }

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Post("post")
  createColonia(@Body() createColoniaDto: CreateColoniaDto, @Request() req) {
  let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear colonias', HttpStatus.FORBIDDEN); 
    }
    return this.coloniaService.createColonia(createColoniaDto);
  }

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)  
  @Put('put/:id')
  updateColonia(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar colonias', HttpStatus.FORBIDDEN); 
    }
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.updateColonia(
      coloniaId, updateColoniaDto,
    );
  }
  
  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
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
