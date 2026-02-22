import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { DonacionesViveresService } from './donaciones_viveres.service';
import { CreateDonacionesViveresDto, UpdateDonacionesViveresDto } from './donaciones_viveres.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { RolUsuario } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Donaciones de Víveres')
@Controller('donaciones-viveres')
export class DonacionesViveresController {
  constructor(private readonly donacionesViveresService: DonacionesViveresService) {}

  @ApiOperation({ summary: 'Obtener todas las donaciones de víveres (admin ve todos, trabajador solo su protectora)' })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    
    // Admin puede ver todas las donaciones
    if (user.rol === RolUsuario.ADMIN) {
      return this.donacionesViveresService.findAll();
    }
    
    // Trabajador solo ve donaciones de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      return this.donacionesViveresService.findByProtectora(user.protectora.id_protectora);
    }

    throw new HttpException('No tienes permisos para ver donaciones de víveres', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Obtener una donación de víveres por ID (con validación multi-tenant)' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getDonacionesViveres(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const donacionesViveresId = parseInt(id);
    
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('ID de donación inválido', HttpStatus.BAD_REQUEST);
    }

    const donacion = await this.donacionesViveresService.getDonacionesViveres(donacionesViveresId);

    // Admin puede ver cualquier donación
    if (user.rol === RolUsuario.ADMIN) {
      return donacion;
    }

    // Trabajador solo puede ver donaciones de su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (donacion.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No tienes permisos para ver donaciones de otra protectora', HttpStatus.FORBIDDEN);
      }
      return donacion;
    }

    throw new HttpException('No tienes permisos para ver donaciones de víveres', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({ summary: 'Crear una nueva donación de víveres (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Post()
  createDonacionesViveres(@Body() createDonacionViveresDto: CreateDonacionesViveresDto, @Request() req) {
    const user = req.user;
    
    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para crear donaciones de víveres', HttpStatus.FORBIDDEN);
    }

    // Trabajador solo puede crear donaciones para su protectora
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario no pertenece a ninguna protectora', HttpStatus.BAD_REQUEST);
      }
      createDonacionViveresDto.protectora = user.protectora.id_protectora;
    }

    return this.donacionesViveresService.createDonacionesViveres(createDonacionViveresDto);
  }

  @ApiOperation({ summary: 'Actualizar una donación de víveres (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateDonacionesViveres(@Param('id') id: string, @Body() updateDonaciones_Viveres: UpdateDonacionesViveresDto, @Request() req) {
    const user = req.user;
    const donacionesViveresId = parseInt(id);

    if (isNaN(donacionesViveresId)) {
      throw new HttpException('ID de donación inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para actualizar donaciones de víveres', HttpStatus.FORBIDDEN);
    }

    // Validar que la donación pertenece a la protectora del trabajador
    const donacion = await this.donacionesViveresService.getDonacionesViveres(donacionesViveresId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (donacion.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes actualizar donaciones de otra protectora', HttpStatus.FORBIDDEN);
      }
      // Evitar que cambie la protectora
      updateDonaciones_Viveres.protectora = user.protectora.id_protectora;
    }

    return this.donacionesViveresService.updateDonacionesViveres({
      ...updateDonaciones_Viveres,
      id_donacion: donacionesViveresId,
    });
  }
  
  @ApiOperation({ summary: 'Eliminar una donación de víveres (admin o trabajador de la protectora)' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteDonacionesViveres(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const donacionesViveresId = parseInt(id);
    
    if (isNaN(donacionesViveresId)) {
      throw new HttpException('ID de donación inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.rol !== RolUsuario.ADMIN && user.rol !== RolUsuario.TRABAJADOR) {
      throw new HttpException('No tienes permisos para eliminar donaciones de víveres', HttpStatus.FORBIDDEN);
    }

    // Validar que la donación pertenece a la protectora del trabajador
    const donacion = await this.donacionesViveresService.getDonacionesViveres(donacionesViveresId);
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (donacion.protectora.id_protectora !== user.protectora?.id_protectora) {
        throw new HttpException('No puedes eliminar donaciones de otra protectora', HttpStatus.FORBIDDEN);
      }
    }

    return this.donacionesViveresService.deleteDonacionesViveres(donacionesViveresId);
  }
}
