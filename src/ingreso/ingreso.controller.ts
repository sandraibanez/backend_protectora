import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto, UpdateIngresoDto } from './ingreso.dto';

@Controller('ingresos')
export class IngresoController {
  // IngresoService: any;
  constructor(private readonly ingresoService: IngresoService) {}

  @Get()
  findAll() {
    return this.ingresoService.findAll();
  }

  @Get(':id')
  getIngreso(@Param('id') id: string) {
    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.getIngreso(ingresoId);
  }
  @Post()
  createIngreso(@Body() createIngresoDto: CreateIngresoDto) {
    return this.ingresoService.createIngreso(createIngresoDto);
  }

  @Put(':id')
  updateIngreso(@Param('id') id: string, @Body() updateIngresoDto: UpdateIngresoDto) {
    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.updateIngreso({
      ...updateIngresoDto,
      id_ingreso: ingresoId,
    });
  }
  
  @Delete(':id')
  deleteIngreso(@Param('id') id: string) {
    const ingresoId = parseInt(id);
    if (isNaN(ingresoId)) {
      throw new HttpException('Invalid ingresos ID', HttpStatus.BAD_REQUEST);
    }
    return this.ingresoService.deleteIngreso(ingresoId);
  }
}
