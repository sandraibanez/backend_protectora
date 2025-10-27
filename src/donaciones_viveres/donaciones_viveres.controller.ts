import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DonacionesViveresService } from './donaciones_viveres.service';
import { CreateDonaciones_ViveresDto, UpdateDonaciones_Viveres } from './donaciones_viveres.dto';

@Controller('donaciones-viveres')
export class DonacionesViveresController {
  constructor(private readonly DonacionesViveresService: DonacionesViveresService) {}

  @Get()
  findAll() {
    return this.DonacionesViveresService.findAll();
  }

  @Get(':id')
  getDonaciones_Viveres(@Param('id') id: string) {
    const DonacionesViveresId = parseInt(id);
    if (isNaN(DonacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.DonacionesViveresService.getDonaciones_Viveres(DonacionesViveresId);
  }
  @Post()
  createDonaciones_Viveres(@Body() createDonacionViveresDto: CreateDonaciones_ViveresDto) {
    return this.DonacionesViveresService.createDonaciones_Viveres(createDonacionViveresDto);
  }

  @Put(':id')
  updateDonaciones_Viveres(@Param('id') id: string, @Body() updateDonaciones_Viveres: UpdateDonaciones_Viveres) {
    const DonacionesViveresId = parseInt(id);
    if (isNaN(DonacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.DonacionesViveresService.updateDonaciones_Viveres({
      ...updateDonaciones_Viveres,
      id: DonacionesViveresId,
    });
  }
  
  @Delete(':id')
  deleteDonaciones_Viveres(@Param('id') id: string) {
    const DonacionesViveresId = parseInt(id);
    if (isNaN(DonacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.DonacionesViveresService.deleteDonaciones_Viveres(DonacionesViveresId);
  }
}
