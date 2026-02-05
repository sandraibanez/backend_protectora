import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request, Patch } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Colonias') 
@Controller('colonias')
export class ColoniaController {
  constructor(private readonly coloniaService: ColoniaService) {}

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Get("get")
  findAll() {
    return this.coloniaService.findAll();
  }

  @ApiOperation({ summary: 'Colonias con info limitada de la protectora del usuario' })
  @UseGuards(AuthGuard)
  @Get('get/limitado/protectora/mias')
  findLimitedByProtectora(@Request() req) {
    const idProtectora = req.user.protectora?.id_protectora;

    if (!idProtectora) {
      throw new HttpException(
        'Este usuario no pertenece a ninguna protectora',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.coloniaService.findLimitedByProtectora(idProtectora);
  }

  @ApiOperation({ summary: 'Colonia con info limitada por protectora e ID' })
  @UseGuards(AuthGuard)
  @Get('get/limitado/protectora/:idColonia')
  findLimitedByProtectoraAndId(
    @Param('idColonia') idColonia: number,
    @Request() req,
  ) {
    const idProtectora = req.user.protectora?.id_protectora;

    if (!idProtectora) {
      throw new HttpException(
        'Este usuario no pertenece a ninguna protectora',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.coloniaService.findLimitedByProtectoraAndId(
      idProtectora,
      idColonia,
    );
  }




  // Falta get de colonias por protectora

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Get('get/:id')
  getColonia(@Param('id') id: string, @Request() req) {
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.getColonia(coloniaId);
  }

  @ApiOperation({ summary: 'Devuelve la cantidad de animales castrados en una colonia' })
  @UseGuards(AuthGuard)
  @Get('get/:idColonia/castrados')
  async contarCastrados(@Param('idColonia') idColonia: number) {
    return {
      id_colonia: idColonia,
      castrados: await this.coloniaService.contarCastrados(idColonia),
    };
  }

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Post("post")
  createColonia(@Body() createColoniaDto: CreateColoniaDto, @Request() req) {
  let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para crear colonias', HttpStatus.FORBIDDEN); 
    }
    return this.coloniaService.createColonia(createColoniaDto);
  }

  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)  
  @Put('put/:id')
  updateColonia(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para actualizar colonias', HttpStatus.FORBIDDEN); 
    }
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.updateColonia(
      coloniaId, updateColoniaDto,
    );
  }

  @ApiOperation({ summary: 'Asigna un animal a una colonia' })
  @UseGuards(AuthGuard)
  @Patch('patch/:idColonia/asignar-animal/:idAnimal')
  async asignarAnimal( @Param('idColonia') idColonia: number, @Param('idAnimal') idAnimal: number, @Request() req) {
    
    const user = req.user;

    // Obtener colonia para validar protectora
    const colonia = await this.coloniaService.getColonia(idColonia);
    if (!colonia) {
      throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
    }

    // Validación de protectora
    if (
      user.rol === 'trabajador' &&
      user.protectora.id_protectora !== colonia.protectora.id_protectora
    ) {
      throw new HttpException(
        'No puedes modificar colonias de otra protectora', HttpStatus.FORBIDDEN,
      );
    }

    return this.coloniaService.asignarAnimal(idColonia, idAnimal);
  }

  
  @ApiOperation({ summary: '' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteColonia(@Param('id') id: string, @Request() req) {
    let userCurrent = req.user.rol;
    if (userCurrent !== 'admin') { 
      throw new HttpException('No tienes permisos para eliminar colonias', HttpStatus.FORBIDDEN); 
    }
    const coloniaId = parseInt(id);
    if (isNaN(coloniaId)) {
      throw new HttpException('Invalid colonia ID', HttpStatus.BAD_REQUEST);
    }
    return this.coloniaService.deleteColonia(coloniaId);
  }
}

