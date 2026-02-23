import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NoticiaService } from './noticia.service';
import { CreateNoticiaDto, UpdateNoticiaDto } from './noticia.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiTags('Noticias')
@Controller('noticias')
export class NoticiaController {
  constructor(private readonly noticiaService: NoticiaService) {}

  // Obtener noticias publicadas de esta app (público, sin autenticación)
  @ApiOperation({ summary: 'Obtener noticias publicadas de esta protectora (público)' })
  @Get('publicas')
  findPublicadas() {
    return this.noticiaService.findPublicadasDeApp();
  }

  // Obtener noticias de mi protectora (trabajador o cliente)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener noticias de mi protectora (autenticado)' })
  @UseGuards(AuthGuard)
  @Get('mi-protectora')
  async findMiProtectora(@Request() req) {
    const user = req.user;

    // Admin ve todas las noticias
    if (user.rol === RolUsuario.ADMIN) {
      return this.noticiaService.findAll();
    }

    // Veterinario no tiene acceso a noticias
    if (user.rol === RolUsuario.VETERINARIO) {
      throw new HttpException('No tienes acceso a noticias', HttpStatus.FORBIDDEN);
    }

    // Cliente y trabajador necesitan tener protectora asignada
    if (!user.protectora || !user.protectora.id_protectora) {
      throw new HttpException('No tienes protectora asignada', HttpStatus.BAD_REQUEST);
    }

    return this.noticiaService.findByProtectora(user.protectora.id_protectora);
  }

  // Obtener todas las noticias (solo admin)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener todas las noticias (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver todas las noticias', HttpStatus.FORBIDDEN);
    }

    return this.noticiaService.findAll();
  }

  // Obtener noticia por ID (público)
  @ApiOperation({ summary: 'Obtener una noticia por ID' })
  @Get('get-one/:id_noticia')
  findOne(@Param('id_noticia') id_noticia: number) {
    return this.noticiaService.findOne(id_noticia);
  }

  // Obtener noticias por protectora (público)
  @ApiOperation({ summary: 'Obtener noticias de una protectora' })
  @Get('protectora/:id_protectora')
  findByProtectora(@Param('id_protectora') id_protectora: number) {
    return this.noticiaService.findByProtectora(id_protectora);
  }

  // Crear noticia (solo trabajador o admin de la protectora)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Crear una noticia (solo trabajador o admin)' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateNoticiaDto, @Request() req) {
    const user = req.user;

    // Solo trabajador o admin pueden crear noticias
    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para crear noticias', HttpStatus.FORBIDDEN);
    }

    // El trabajador crea noticias para su protectora automáticamente
    if (user.rol === RolUsuario.TRABAJADOR) {
      if (!user.protectora?.id_protectora) {
        throw new HttpException('Usuario sin protectora asignada', HttpStatus.BAD_REQUEST);
      }
      dto.id_protectora = user.protectora.id_protectora;
    }

    // Admin debe especificar la protectora
    if (user.rol === RolUsuario.ADMIN && !dto.id_protectora) {
      throw new HttpException('Admin debe especificar la protectora', HttpStatus.BAD_REQUEST);
    }

    // El autor es el usuario logeado
    dto.id_user = user.id_user;

    return this.noticiaService.create(dto);
  }

  // Actualizar noticia (solo trabajador o admin de la protectora)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Actualizar una noticia (solo trabajador o admin)' })
  @UseGuards(AuthGuard)
  @Put('put/:id_noticia')
  async update(
    @Param('id_noticia') id_noticia: number,
    @Body() dto: UpdateNoticiaDto,
    @Request() req
  ) {
    const user = req.user;

    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para actualizar noticias', HttpStatus.FORBIDDEN);
    }

    // Cargar la noticia para validar protectora
    const noticia = await this.noticiaService.findOne(id_noticia);

    if (user.rol === RolUsuario.TRABAJADOR) {
      if (noticia.protectora.id_protectora !== user.protectora.id_protectora) {
        throw new HttpException(
          'No puedes modificar noticias de otra protectora',
          HttpStatus.FORBIDDEN
        );
      }
    }

    return this.noticiaService.update(id_noticia, dto);
  }

  // Eliminar noticia (solo admin)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Eliminar una noticia (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_noticia')
  delete(@Param('id_noticia') id_noticia: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para eliminar noticias', HttpStatus.FORBIDDEN);
    }

    return this.noticiaService.delete(id_noticia);
  }
}
