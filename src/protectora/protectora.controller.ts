import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { CreateProtectoraDto, UpdateProtectoraDto } from './protectora.dto';
import { ProtectoraService } from './protectora.service';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Protectoras') 
@Controller('protectoras')
export class ProtectoraController {
  constructor(private readonly protectoraService: ProtectoraService) {}

  @ApiOperation({ summary: 'Obtener todas las protectoras (solo admin)' })  
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    
    // Solo admin puede ver todas las protectoras
    if (user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver todas las protectoras', HttpStatus.FORBIDDEN);
    }
    
    return this.protectoraService.findAll();
  }

  @ApiOperation({ summary: 'Obtener mi protectora (trabajador, veterinario, cliente)' })  
  @UseGuards(AuthGuard)
  @Get('mi-protectora')
  getMyProtectora(@Request() req) {
    const user = req.user;
    
    if (!user.protectora?.id_protectora) {
      throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
    }
    
    return this.protectoraService.getProtectora(user.protectora.id_protectora);
  }

  @ApiOperation({ summary: 'Obtener una protectora por ID (admin ve cualquiera, otros solo la suya)' })  
  @UseGuards(AuthGuard)
  @Get(':id')
  async getProtectora(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const protectoraId = parseInt(id);
    
    if (isNaN(protectoraId)) {
      throw new HttpException('ID de protectora inválido', HttpStatus.BAD_REQUEST);
    }

    // Admin puede ver cualquier protectora
    if (user.rol === RolUsuario.ADMIN) {
      return this.protectoraService.getProtectora(protectoraId);
    }

    // Otros roles solo pueden ver su propia protectora
    if (user.protectora?.id_protectora !== protectoraId) {
      throw new HttpException('No tienes permisos para ver esta protectora', HttpStatus.FORBIDDEN);
    }

    return this.protectoraService.getProtectora(protectoraId);
  }
  
  @ApiOperation({ summary: 'Crear una nueva protectora (solo admin)' })  
  @UseGuards(AuthGuard)
  @Post()
  createProtectora(@Body() createProtectoraDto: CreateProtectoraDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para crear protectoras', HttpStatus.FORBIDDEN); 
    }
    return this.protectoraService.createProtectora(createProtectoraDto);
  }

  @ApiOperation({ summary: 'Actualizar una protectora (solo admin)' })  
  @UseGuards(AuthGuard)
  @Put(':id')
  updateProtectora(@Param('id') id: string, @Body() updateProtectora: UpdateProtectoraDto, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para actualizar protectoras', HttpStatus.FORBIDDEN); 
    }
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('ID de protectora inválido', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.updateProtectora({
      ...updateProtectora,
      id_protectora: protectoraId,
    });
  }
  
  @ApiOperation({ summary: 'Eliminar una protectora (solo admin)' })  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProtectora(@Param('id') id: string, @Request() req) {
    const user = req.user;
    if (user.rol !== RolUsuario.ADMIN) { 
      throw new HttpException('No tienes permisos para eliminar protectoras', HttpStatus.FORBIDDEN);
    }
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('ID de protectora inválido', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.deleteProtectora(protectoraId);
  }
}
