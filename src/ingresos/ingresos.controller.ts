import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresosDto, UpdateIngresos } from './ingresos.dto';

@Controller('ingresos')
export class IngresosController {
  // IngresosService: any;
  constructor(private readonly IngresosService: IngresosService) {}

  @Get()
  findAll() {
    return this.IngresosService.findAll();
  }

  @Get(':id')
  getIngresos(@Param('id') id: string) {
    const ingresosID = parseInt(id);
    if (isNaN(ingresosID)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.IngresosService.getIngresos(ingresosID);
  }
  @Post()
  createingresos(@Body() createingresoDto: CreateIngresosDto) {
    return this.IngresosService.createIngresos(createingresoDto);
  }

  @Put(':id')
  updateingresos(@Param('id') id: string, @Body() updateingreso: UpdateIngresos) {
    const ingresosID = parseInt(id);
    if (isNaN(ingresosID)) {
      throw new HttpException('Invalid ingreso ID', HttpStatus.BAD_REQUEST);
    }
    return this.IngresosService.updateIngresos({
      ...updateingreso,
      id: ingresosID,
    });
  }
  
  @Delete(':id')
  deleteingresos(@Param('id') id: string) {
    const ingresosID = parseInt(id);
    if (isNaN(ingresosID)) {
      throw new HttpException('Invalid ingresos ID', HttpStatus.BAD_REQUEST);
    }
    return this.IngresosService.deleteIngresos(ingresosID);
  }
}
