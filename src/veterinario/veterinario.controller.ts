import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto, UpdateVeterinarioDto } from './veterinario.dto';

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

  @Post()
  createVeterinario(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinarioService.createVeterinario(createVeterinarioDto);
  }

  @Put(':id')
  updateVeterinario(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto) {
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.updateVeterinario({
      ...updateVeterinarioDto,
      id_veterinario: veterinarioId,
    });
  }

  @Delete(':id')
  deleteVeterinario(@Param('id') id: string) {
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.deleteVeterinario(veterinarioId);
  }
}
