import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { MedicacionService } from './medicacion.service';
import { CreateMedicacionDto, UpdateMedicacionDto } from './medicacion.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Medicaciones') 
@Controller('medicaciones')
export class MedicacionController {

  constructor(private readonly medicacionService: MedicacionService) {}

  @ApiOperation({ summary: 'Obtener todas las medicaciones' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para ver medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una medicación por ID' })
  @UseGuards(AuthGuard)
  @Get('get-:id')
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

  @ApiOperation({ summary: 'Crear una nueva medicación' })
  @UseGuards(AuthGuard)
  @Post("post")
  createMedicacion(@Body() createMedicacionDto: CreateMedicacionDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para crear medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.createMedicacion(createMedicacionDto);
  }

  @ApiOperation({ summary: 'Actualizar una medicación existente' })
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
  
  @ApiOperation({ summary: 'Eliminar una medicación' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteMedicacion(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.deleteMedicacion(medicacionId);
  }
}
