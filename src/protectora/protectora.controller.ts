import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { CreateProtectoraDto, UpdateProtectoraDto } from './protectora.dto';
import { ProtectoraService } from './protectora.service';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Protectoras') 
@Controller('protectoras')
export class ProtectoraController {
  // ProtectoraService: any;
  constructor(private readonly protectoraService: ProtectoraService) {}

  @ApiOperation({ summary: '' })  
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.protectoraService.findAll();
  }

  @ApiOperation({ summary: '' })  
  @UseGuards(AuthGuard)
  @Get(':id')
  getProtectora(@Param('id') id: string) {
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.getProtectora(protectoraId);
  }
  
  @ApiOperation({ summary: '' })  
  @UseGuards(AuthGuard)
  @Post()
  createProtectora(@Body() createProtectoraDto: CreateProtectoraDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear protectoras', HttpStatus.FORBIDDEN); 
    }
      return this.protectoraService.createProtectora(createProtectoraDto);
  }

  @ApiOperation({ summary: '' })  
  @UseGuards(AuthGuard)
  @Put(':id')
  updateProtectora(@Param('id') id: string, @Body() updateProtectora: UpdateProtectoraDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar protectoras', HttpStatus.FORBIDDEN); 
    }
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid Protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.updateProtectora({
      ...updateProtectora,
      id_protectora: protectoraId,
    });
  }
  
  @ApiOperation({ summary: '' })  
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProtectora(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar protectoras', HttpStatus.FORBIDDEN);
    }
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid Protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.deleteProtectora(protectoraId);
  }
}
