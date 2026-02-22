import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { MedicacionService } from './medicacion.service';
import { CreateMedicacionDto, UpdateMedicacionDto } from './medicacion.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Medicaciones') 
@Controller('medicaciones')
export class MedicacionController {

  constructor(private readonly medicacionService: MedicacionService) {}

  @ApiOperation({ summary: 'Obtener todas las medicaciones (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll(@Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) { 
      throw new HttpException('No tienes permisos para ver medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una medicación por ID (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Get('get-:id')
  getMedicacion(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) { 
      throw new HttpException('No tienes permisos para ver medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('ID de medicación inválido', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.getMedicacion(medicacionId);
  }

  @ApiOperation({ summary: 'Crear una nueva medicación (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Post("post")
  createMedicacion(@Body() createMedicacionDto: CreateMedicacionDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) { 
      throw new HttpException('No tienes permisos para crear medicaciones', HttpStatus.FORBIDDEN); 
    }
    return this.medicacionService.createMedicacion(createMedicacionDto);
  }

  @ApiOperation({ summary: 'Actualizar una medicación existente (admin o veterinario)' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateMedicacion(@Param('id') id: string, @Body() updateMedicacionDto: UpdateMedicacionDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.VETERINARIO) { 
      throw new HttpException('No tienes permisos para actualizar medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('ID de medicación inválido', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.updateMedicacion({
      ...updateMedicacionDto,
      id_medicacion: medicacionId,
    });
  }
  
  @ApiOperation({ summary: 'Eliminar una medicación (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteMedicacion(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para eliminar medicaciones', HttpStatus.FORBIDDEN); 
    }
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('ID de medicación inválido', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.deleteMedicacion(medicacionId);
  }
}
