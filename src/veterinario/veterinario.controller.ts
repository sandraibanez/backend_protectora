import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto, UpdateVeterinarioDto } from './veterinario.dto';
import { AuthGuard } from 'src/authentication/guards/guard';

@Controller('veterinarios')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Get()
  findAll() {
    return this.veterinarioService.findAll();
  }

  @Get(':id')
  getVeterinario(@Param('id') id: string) {
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.getVeterinario(veterinarioId);
  }

  @UseGuards(AuthGuard)
  @Post()
  createVeterinario(@Body() createVeterinarioDto: CreateVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para crear veterinarios', HttpStatus.FORBIDDEN);
    }
    return this.veterinarioService.createVeterinario(createVeterinarioDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateVeterinario(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para actualizar veterinarios', HttpStatus.FORBIDDEN);
    }
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.updateVeterinario({
      ...updateVeterinarioDto,
      id_veterinario: veterinarioId,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteVeterinario(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para eliminar veterinarios', HttpStatus.FORBIDDEN);
    }
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.deleteVeterinario(veterinarioId);
  }
}
