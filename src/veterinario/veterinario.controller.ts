import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto, UpdateVeterinarioDto } from './veterinario.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Veterinarios') 
@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @ApiOperation({ summary: 'Obtener todos los veterinarios (solo admin)'}) 
  @UseGuards(AuthGuard)
  @Get("get")
  findAll() {
    return this.veterinarioService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un veterinario por ID (solo admin)' }) 
  @UseGuards(AuthGuard)
  @Get('get-:id')
  getVeterinario(@Param('id') id: string) {
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.getVeterinario(veterinarioId);
  }

  @ApiOperation({ summary: 'Crear un nuevo veterinario (admin y veterinario)' })  
  @UseGuards(AuthGuard)
  @Post("post")
  createVeterinario(@Body() createVeterinarioDto: CreateVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para crear veterinarios', HttpStatus.FORBIDDEN);
    }
    return this.veterinarioService.createVeterinario(createVeterinarioDto);
  }

  @ApiOperation({ summary: 'Actualizar un veterinario por ID (admin y veterinario)'}) 
  @UseGuards(AuthGuard)
  @Put('put-:id')
  updateVeterinario(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin' && userCurrent !== 'veterinario') { 
      throw new HttpException('No tienes permisos para actualizar veterinarios', HttpStatus.FORBIDDEN);
    }
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.updateVeterinario({
      ...updateVeterinarioDto,
      id_veterinario: veterinarioId,
    });
  }

  @ApiOperation({ summary: 'Eliminar un veterinario por ID (admin)' }) 
  @UseGuards(AuthGuard)
  @Delete('delete-:id')
  deleteVeterinario(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar veterinarios', HttpStatus.FORBIDDEN);
    }
    const veterinarioId = parseInt(id);
    if (isNaN(veterinarioId)) {
      throw new HttpException('Invalid veterinario ID', HttpStatus.BAD_REQUEST);
    }
    return this.veterinarioService.deleteVeterinario(veterinarioId);
  }
}
