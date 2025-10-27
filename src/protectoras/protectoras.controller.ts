import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProtectorasDto, UpdateProtectoras } from './protectoras.dto';
import { ProtectorasService } from './protectoras.service';

@Controller('protectoras')
export class ProtectorasController {
  // ProtectorasService: any;
  constructor(private readonly ProtectorasService: ProtectorasService) {}

  @Get()
  findAll() {
    return this.ProtectorasService.findAll();
  }

  @Get(':id')
  getProtectoras(@Param('id') id: string) {
    const protectorasId = parseInt(id);
    if (isNaN(protectorasId)) {
      throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.ProtectorasService.getProtectoras(protectorasId);
  }
  @Post()
    createProtectoras(@Body() createProtectorasDto: CreateProtectorasDto) {
        return this.ProtectorasService.createProtectoras(createProtectorasDto);
    }

  @Put(':id')
  updateProtectoras(@Param('id') id: string, @Body() updateProtectoras: UpdateProtectoras) {
    const Protectoras_id = parseInt(id);
    if (isNaN(Protectoras_id)) {
      throw new HttpException('Invalid Protectoras ID', HttpStatus.BAD_REQUEST);
    }
    return this.ProtectorasService.updateProtectoras({
      ...updateProtectoras,
      id: Protectoras_id,
    });
  }
  
  @Delete(':id')
  deleteProtectoras(@Param('id') id: string) {
    const protectorasId = parseInt(id);
    if (isNaN(protectorasId)) {
      throw new HttpException('Invalid Protectoras ID', HttpStatus.BAD_REQUEST);
    }
    return this.ProtectorasService.deleteProtectoras(protectorasId);
  }
}
