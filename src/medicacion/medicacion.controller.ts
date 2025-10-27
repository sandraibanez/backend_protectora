import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MedicacionService } from './medicacion.service';
import { CreateMedicacionDto, UpdateMedicacion } from './medicacion.dto';

@Controller('medicacion')
export class MedicacionController {
    // MedicacionService: any;
  constructor(private readonly MedicacionService: MedicacionService) {}

  @Get()
  findAll() {
    return this.MedicacionService.findAll();
  }

  @Get(':id')
  getMedicacion(@Param('id') id: string) {
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.MedicacionService.getMedicacion(medicacionId);
  }
  @Post()
  createMedicacion(@Body() createMedicacionDto: CreateMedicacionDto) {
    return this.MedicacionService.createMedicacion(createMedicacionDto);
  }

  @Put(':id')
  updateMedicacion(@Param('id') id: string, @Body() updateMedicacion: UpdateMedicacion) {
    const Medicacion_id = parseInt(id);
    if (isNaN(Medicacion_id)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.MedicacionService.updateMedicacion({
      ...updateMedicacion,
      id: Medicacion_id,
    });
  }
  
  @Delete(':id')
  deleteMedicacion(@Param('id') id: string) {
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.MedicacionService.deleteMedicacion(medicacionId);
  }
}
