import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MedicacionService } from './medicacion.service';
import { CreateMedicacionDto, UpdateMedicacionDto } from './medicacion.dto';

@Controller('medicaciones')
export class MedicacionController {
    // MedicacionService: any;
  constructor(private readonly medicacionService: MedicacionService) {}

  @Get()
  findAll() {
    return this.medicacionService.findAll();
  }

  @Get(':id')
  getMedicacion(@Param('id') id: string) {
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.getMedicacion(medicacionId);
  }
  @Post()
  createMedicacion(@Body() createMedicacionDto: CreateMedicacionDto) {
    return this.medicacionService.createMedicacion(createMedicacionDto);
  }

  @Put(':id')
  updateMedicacion(@Param('id') id: string, @Body() updateMedicacionDto: UpdateMedicacionDto) {
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.updateMedicacion({
      ...updateMedicacionDto,
      id_medicacion: medicacionId,
    });
  }
  
  @Delete(':id')
  deleteMedicacion(@Param('id') id: string) {
    const medicacionId = parseInt(id);
    if (isNaN(medicacionId)) {
      throw new HttpException('Invalid medicacion ID', HttpStatus.BAD_REQUEST);
    }
    return this.medicacionService.deleteMedicacion(medicacionId);
  }
}
