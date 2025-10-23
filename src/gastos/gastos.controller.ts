import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastosDto, UpdateGastos } from './gastos.dto';

@Controller('gastos')
export class GastosController {
    GastosService: any;
            constructor(private readonly GastoService: GastosService) {}
            
              @Get()
              findAll() {
                return this.GastoService.findAll();
              }
            
              @Get(':id')
              getGastos(@Param('id') id: string) {
                const gastosID = parseInt(id);
                if (isNaN(gastosID)) {
                  throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
                }
                return this.GastoService.getGastos(gastosID);
              }
              @Post()
              createGastos(@Body() createGastoDto: CreateGastosDto) {
                return this.GastoService.createGastos(createGastoDto);
              }
            
              @Put(':id')
              updateGastos(@Param('id') id: string, @Body() updateGasto: UpdateGastos) {
                const gastosID = parseInt(id);
                if (isNaN(gastosID)) {
                  throw new HttpException('Invalid gasto ID', HttpStatus.BAD_REQUEST);
                }
                return this.GastoService.updateGastos({
                  ...updateGasto,
                  id: gastosID,
                });
              }
              
              @Delete(':id')
              deleteGastos(@Param('id') id: string) {
                const gastosID = parseInt(id);
                if (isNaN(gastosID)) {
                  throw new HttpException('Invalid gastos ID', HttpStatus.BAD_REQUEST);
                }
                return this.GastoService.deleteGastos(gastosID);
              }
}
