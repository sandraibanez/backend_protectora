import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DonacionesViveresService } from './donaciones_viveres.service';
import { CreateDonacionesViveresDto, UpdateDonacionesViveresDto } from './donaciones_viveres.dto';

@Controller('donaciones-viveres')
export class DonacionesViveresController {
  constructor(private readonly donacionesViveresService: DonacionesViveresService) {}

  @Get()
  findAll() {
    return this.donacionesViveresService.findAll();
  }

  @Get(':id')
  getDonacionesViveres(@Param('id') id: string) {
    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.getDonacionesViveres(donacionesViveresId);
  }
  @Post()
  createDonacionesViveres(@Body() createDonacionViveresDto: CreateDonacionesViveresDto) {
    return this.donacionesViveresService.createDonacionesViveres(createDonacionViveresDto);
  }

  @Put(':id')
  updateDonacionesViveres(@Param('id') id: string, @Body() updateDonaciones_Viveres: UpdateDonacionesViveresDto) {
    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.updateDonacionesViveres({
      ...updateDonaciones_Viveres,
      id_donacion: donacionesViveresId,
    });
  }
  
  @Delete(':id')
  deleteDonacionesViveres(@Param('id') id: string) {
    const donacionesViveresId = parseInt(id);
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('Invalid Donaciones Viveres ID', HttpStatus.BAD_REQUEST);
    }
    return this.donacionesViveresService.deleteDonacionesViveres(donacionesViveresId);
  }
}
