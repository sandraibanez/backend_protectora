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
import { AcogidaService } from './acogida.service';
import { CreateAcogidaDto, UpdateAcogidaDto } from './acogida.dto';
import { AuthGuard } from 'src/authentication/guards/guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RolUsuario } from 'src/user/user.entity';

@ApiBearerAuth('access-token')
@ApiTags('Acogidas')
@Controller('acogidas')
export class AcogidaController {
  constructor(private readonly acogidaService: AcogidaService) {}

  // Crear solicitud de acogida (cliente o trabajador)
  @ApiOperation({ summary: 'Crear una solicitud de acogida' })
  @UseGuards(AuthGuard)
  @Post('post')
  create(@Body() dto: CreateAcogidaDto, @Request() req) {
    const user = req.user;

    // Solo cliente o trabajador pueden crear solicitudes
    if (user.rol !== RolUsuario.CLIENTE && user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para crear acogidas', HttpStatus.FORBIDDEN);
    }

    // El usuario solo puede crear acogidas para su protectora
    dto.id_usuario = user.id_user;

    return this.acogidaService.create(dto);
  }

  // Obtener todas las acogidas (solo admin)
  @ApiOperation({ summary: 'Obtener todas las acogidas (solo admin)' })
  @UseGuards(AuthGuard)
  @Get('get')
  findAll(@Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver todas las acogidas', HttpStatus.FORBIDDEN);
    }

    return this.acogidaService.findAll();
  }

  // FALTA SEGURIDAD
  // Obtener acogidas del usuario logeado
  @ApiOperation({ summary: 'Obtener mis solicitudes de acogida' })
  @UseGuards(AuthGuard)
  @Get('get-mine')
  findMine(@Request() req) {
    const user = req.user.id_user;
    return this.acogidaService.findByUsuario(user);
  }

  // Obtener acogidas por animal (trabajador o admin)
  @ApiOperation({ summary: 'Obtener acogidas de un animal' })
  @UseGuards(AuthGuard)
  @Get('get-animal/:id_animal')
  findByAnimal(@Param('id_animal') id_animal: number, @Request() req) {
    const user = req.user;

    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para ver acogidas de animales', HttpStatus.FORBIDDEN);
    }

    return this.acogidaService.findByAnimal(id_animal);
  }

  // Obtener acogida por ID
  @ApiOperation({ summary: 'Obtener una acogida por ID' })
  @UseGuards(AuthGuard)
  @Get('get-one/:id_acogida')
  findOne(@Param('id_acogida') id_acogida: number, @Request() req) {
    const user = req.user;

    // Cliente solo puede ver sus propias acogidas
    if (user.rol === RolUsuario.CLIENTE) {
      return this.acogidaService.findOne(id_acogida).then(acogida => {
        if (acogida.usuario.id_user !== user.id_user) {
          throw new HttpException('No tienes permisos para ver esta acogida', HttpStatus.FORBIDDEN);
        }
        return acogida;
      });
    }

    return this.acogidaService.findOne(id_acogida);
  }

  // Actualizar acogida (solo trabajador o admin)
  @ApiOperation({ summary: 'Actualizar una acogida (solo trabajador o admin)' })
  @UseGuards(AuthGuard)
  @Put('put/:id_acogida')
  async update(
    @Param('id_acogida') id_acogida: number,
    @Body() dto: UpdateAcogidaDto,
    @Request() req
  ) {
    const user = req.user;

    if (user.rol !== RolUsuario.TRABAJADOR && user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para actualizar acogidas', HttpStatus.FORBIDDEN);
    }

    // Cargar la acogida para validar protectora
    const acogida = await this.acogidaService.findOne(id_acogida);

    if (user.rol === RolUsuario.TRABAJADOR) { 
        if (acogida.animal.protectora.id_protectora !== user.protectora.id_protectora) { 
            throw new HttpException( 'No puedes modificar acogidas de otra protectora', HttpStatus.FORBIDDEN ); 
        } 
    }

    return this.acogidaService.update(id_acogida, dto);
  }

  // Eliminar acogida (solo admin)
  @ApiOperation({ summary: 'Eliminar una acogida (solo admin)' })
  @UseGuards(AuthGuard)
  @Delete('delete/:id_acogida')
  delete(@Param('id_acogida') id_acogida: number, @Request() req) {
    if (req.user.rol !== RolUsuario.ADMIN) {
      throw new HttpException('No tienes permisos para eliminar acogidas', HttpStatus.FORBIDDEN);
    }

    return this.acogidaService.delete(id_acogida);
  }
}
