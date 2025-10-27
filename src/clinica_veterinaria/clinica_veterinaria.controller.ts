import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ClinicaVeterinariaService } from './clinica_veterinaria.service';
import { CreateClinica_VeterinariaDto, UpdateClinica_Veterinaria } from './clinica_veterinaria.dto';

@Controller('clinica-veterinaria')
export class ClinicaVeterinariaController {
  constructor(private readonly ClinicaVeterinariaService: ClinicaVeterinariaService) {}

  @Get()
  findAll() {
    return this.ClinicaVeterinariaService.findAll();
  }

  @Get(':id')
  getClinica_Veterinaria(@Param('id') id: string) {
    const clinica_veterinarialId = parseInt(id);
    if (isNaN(clinica_veterinarialId)) {
      throw new HttpException('Invalid clinica veterinaria ID', HttpStatus.BAD_REQUEST);
    }
    return this.ClinicaVeterinariaService.getClinica_Veterinaria(clinica_veterinarialId);
  }
  @Post()
  createClinica_Veterinaria(@Body() createClinica_VeterinariaDto: CreateClinica_VeterinariaDto) {
    return this.ClinicaVeterinariaService.createClinica_Veterinaria(createClinica_VeterinariaDto);
  }

  @Put(':id')
  updateClinica_Veterinaria(@Param('id') id: string, @Body() UpdateClinica_Veterinaria: UpdateClinica_Veterinaria) {
    const clinica_veterinariaId = parseInt(id);
    if (isNaN(clinica_veterinariaId)) {
      throw new HttpException('Invalid clinica veterinaria ID', HttpStatus.BAD_REQUEST);
    }
    return this.ClinicaVeterinariaService.updateClinica_Veterinaria({
      ...UpdateClinica_Veterinaria,
      id: clinica_veterinariaId,
    });
  }
  
  @Delete(':id')
  deleteClinica_Veterinaria(@Param('id') id: string) {
    const clinica_veterinarialId = parseInt(id);
    if (isNaN(clinica_veterinarialId)) {
      throw new HttpException('Invalid clinica veterinaria ID', HttpStatus.BAD_REQUEST);
    }
    return this.ClinicaVeterinariaService.deleteClinica_Veterinaria(clinica_veterinarialId);
  }
}
