import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto, UpdateGastoDto } from './gasto.dto';

@Controller('gastos')
export class GastoController {
  // GastoService: any;
  constructor(private readonly gastoService: GastoService) {}

  @Get()
  findAll() {
    return this.gastoService.findAll();
  }

  @Get(':id')
  getGasto(@Param('id') id: string) {
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.getGasto(gastoId);
  }

  @Post()
  createGasto(@Body() createGastoDto: CreateGastoDto) {
    return this.gastoService.createGasto(createGastoDto);
  }

  @Put(':id')
  updateGasto(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.updateGasto({
      ...updateGastoDto,
      id_gasto: gastoId,
    });
  }

  @Delete(':id')
  deleteGasto(@Param('id') id: string) {
    const gastoId = parseInt(id);
    if (isNaN(gastoId)) {
      throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
    }
    return this.gastoService.deleteGasto(gastoId);
  }
}
