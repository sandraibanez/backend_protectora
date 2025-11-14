import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProtectoraDto, UpdateProtectoraDto } from './protectora.dto';
import { ProtectoraService } from './protectora.service';

@Controller('protectoras')
export class ProtectoraController {
  // ProtectoraService: any;
  constructor(private readonly protectoraService: ProtectoraService) {}

  @Get()
  findAll() {
    return this.protectoraService.findAll();
  }

  @Get(':id')
  getProtectora(@Param('id') id: string) {
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.getProtectora(protectoraId);
  }
  @Post()
    createProtectora(@Body() createProtectoraDto: CreateProtectoraDto) {
        return this.protectoraService.createProtectora(createProtectoraDto);
    }

  @Put(':id')
  updateProtectora(@Param('id') id: string, @Body() updateProtectora: UpdateProtectoraDto) {
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid Protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.updateProtectora({
      ...updateProtectora,
      id_protectora: protectoraId,
    });
  }
  
  @Delete(':id')
  deleteProtectora(@Param('id') id: string) {
    const protectoraId = parseInt(id);
    if (isNaN(protectoraId)) {
      throw new HttpException('Invalid Protectora ID', HttpStatus.BAD_REQUEST);
    }
    return this.protectoraService.deleteProtectora(protectoraId);
  }
}
