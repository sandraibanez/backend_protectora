import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { MedicacionService } from './medicacion.service';
import { CreateMedicacionDto, UpdateMedicacionDto } from './medicacion.dto';
import { AuthGuard } from 'src/authentication/auth/guard';

@Controller('medicaciones')
export class MedicacionController {
    // MedicacionService: any;
  constructor(private readonly medicacionService: MedicacionService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para ver medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getMedicacion(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para ver medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.getMedicacion(medicacionId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createMedicacion(@Body() createMedicacionDto: CreateMedicacionDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para crear medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.createMedicacion(createMedicacionDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateMedicacion(@Param('id') id: string, @Body() updateMedicacionDto: UpdateMedicacionDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para actualizar medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.updateMedicacion({
      ...updateMedicacionDto,
      id_medicacion: medicacionId,
    });
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteMedicacion(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para eliminar medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.deleteMedicacion(medicacionId);
  }
}
