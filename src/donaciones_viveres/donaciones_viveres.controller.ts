import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { DonacionesViveresService } from './donaciones_viveres.service';
import { CreateDonacionesViveresDto, UpdateDonacionesViveresDto } from './donaciones_viveres.dto';
import { AuthGuard } from 'src/authentication/guards/guard';

@Controller('donaciones-viveres')
export class DonacionesViveresController {
  constructor(private readonly donacionesViveresService: DonacionesViveresService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver donaciones de víveres', HttpStatus.FORBIDDEN); 
    }
    return this.donacionesViveresService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getDonacionesViveres(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para ver donaciones de víveres', HttpStatus.FORBIDDEN); 
    }
    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.getDonacionesViveres(donacionesViveresId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createDonacionesViveres(@Body() createDonacionViveresDto: CreateDonacionesViveresDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear donaciones de víveres', HttpStatus.FORBIDDEN); 
    }
    return this.donacionesViveresService.createDonacionesViveres(createDonacionViveresDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateDonacionesViveres(@Param('id') id: string, @Body() updateDonaciones_Viveres: UpdateDonacionesViveresDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar donaciones de víveres', HttpStatus.FORBIDDEN); 
    }

    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.updateDonacionesViveres({
      ...updateDonaciones_Viveres,
      id_donacion: donacionesViveresId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDonacionesViveres(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar donaciones de víveres', HttpStatus.FORBIDDEN); 
    }
    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.deleteDonacionesViveres(donacionesViveresId);
  }
}
