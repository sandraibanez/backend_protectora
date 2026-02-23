import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoAdopcion } from './adopcion.entity';

export class CreateAdopcionDto {
  @ApiProperty({
    example: '2025-04-18T14:30:00Z',
    description: 'Fecha y hora de la solicitud'
  })
  @IsDateString()
  fecha_solicitud: Date;

  @ApiPropertyOptional({
    enum: EstadoAdopcion,
    example: EstadoAdopcion.PENDIENTE,
    description: 'Estado inicial (por defecto PENDIENTE)'
  })
  @IsEnum(EstadoAdopcion)
  @IsOptional()
  estado?: EstadoAdopcion;

  @ApiPropertyOptional({
    example: 'Tengo experiencia con perros y casa con jardín',
    description: 'Observaciones del solicitante'
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ example: 12, description: 'ID del animal a adoptar' })
  @IsInt()
  @Type(() => Number)
  id_animal: number;

  @ApiProperty({ example: 5, description: 'ID del usuario adoptante' })
  @IsInt()
  @Type(() => Number)
  id_adoptante: number;
}

export class UpdateAdopcionDto {
  @ApiPropertyOptional({
    example: '2025-04-20T10:00:00Z',
    description: 'Fecha de respuesta a la solicitud'
  })
  @IsOptional()
  @IsDateString()
  fecha_respuesta?: Date;

  @ApiPropertyOptional({
    example: '2025-04-25T12:00:00Z',
    description: 'Fecha en que se entrega el animal'
  })
  @IsOptional()
  @IsDateString()
  fecha_adopcion?: Date;

  @ApiPropertyOptional({
    enum: EstadoAdopcion,
    example: EstadoAdopcion.APROBADA,
    description: 'Nuevo estado de la adopción'
  })
  @IsOptional()
  @IsEnum(EstadoAdopcion)
  estado?: EstadoAdopcion;

  @ApiPropertyOptional({
    example: 'Actualización de información',
    description: 'Observaciones del solicitante'
  })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({
    example: 'Familia aprobada según evaluación',
    description: 'Notas del trabajador'
  })
  @IsOptional()
  @IsString()
  notas_trabajador?: string;
}
