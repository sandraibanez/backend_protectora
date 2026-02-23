import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Estadísticas/Informes')
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  // Obtener estadísticas generales de la protectora
  @ApiOperation({ summary: 'Obtener estadísticas generales de la protectora (trabajador/admin)' })
  @UseGuards(AuthGuard)
  @Get('generales')
  async getEstadisticasGenerales(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasGenerales();
  }

  // Obtener estadísticas de animales
  @ApiOperation({ summary: 'Obtener estadísticas de animales por estado' })
  @UseGuards(AuthGuard)
  @Get('animales')
  async getEstadisticasAnimales(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasAnimales();
  }

  // Obtener estadísticas de donaciones por período
  @ApiOperation({ summary: 'Obtener estadísticas de donaciones económicas por mes/año' })
  @ApiQuery({ name: 'mes', required: false, description: 'Mes (1-12)' })
  @ApiQuery({ name: 'anio', required: false, description: 'Año (ej: 2026)' })
  @UseGuards(AuthGuard)
  @Get('donaciones')
  async getEstadisticasDonaciones(
    @Query('mes') mes?: number,
    @Query('anio') anio?: number,
    @Request() req?,
  ) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasDonaciones(mes, anio);
  }

  // Obtener estadísticas de acogidas
  @ApiOperation({ summary: 'Obtener estadísticas de acogidas (activas, total, etc.)' })
  @UseGuards(AuthGuard)
  @Get('acogidas')
  async getEstadisticasAcogidas(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasAcogidas();
  }

  // Obtener estadísticas de apadrinamientos
  @ApiOperation({ summary: 'Obtener estadísticas de apadrinamientos (activos, total, etc.)' })
  @UseGuards(AuthGuard)
  @Get('apadrinamientos')
  async getEstadisticasApadrinamientos(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasApadrinamientos();
  }

  // Obtener estadísticas de adopciones
  @ApiOperation({ summary: 'Obtener estadísticas de adopciones por estado' })
  @UseGuards(AuthGuard)
  @Get('adopciones')
  async getEstadisticasAdopciones(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasAdopciones();
  }

  // Obtener estadísticas de colonias
  @ApiOperation({ summary: 'Obtener estadísticas de colonias (total gatos, castrados, etc.)' })
  @UseGuards(AuthGuard)
  @Get('colonias')
  async getEstadisticasColonias(@Request() req) {
    const user = req.user;

    // Solo trabajador o admin
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver estadísticas', HttpStatus.FORBIDDEN);
    }

    return this.estadisticasService.getEstadisticasColonias();
  }
}
