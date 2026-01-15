import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto, UpdateGastoDto } from './gasto.dto';
import { AuthGuard } from 'src/authentication/guards/guard';

@Controller('gastos')
export class GastoController {
  // GastoService: any;
  constructor(private readonly gastoService: GastoService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver gastos', HttpStatus.FORBIDDEN); 
    }
    return this.gastoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getGasto(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver gastos', HttpStatus.FORBIDDEN); 
    }
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.getGasto(gastoId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createGasto(@Body() createGastoDto: CreateGastoDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear gastos', HttpStatus.FORBIDDEN); 
    }
    return this.gastoService.createGasto(createGastoDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateGasto(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar gastos', HttpStatus.FORBIDDEN); 
    }
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.updateGasto({
      ...updateGastoDto,
      id_gasto: gastoId,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteGasto(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar gastos', HttpStatus.FORBIDDEN); 
    }
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.deleteGasto(gastoId);
  }
}
