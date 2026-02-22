import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt, IsOptional, IsEnum } from 'class-validator';
import { EstadoAcogida } from './acogida.entity';

export class CreateAcogidaDto {
  @ApiProperty({
    example: '2025-04-18T14:30:00Z',
    description: 'Fecha y hora en la que se solicita la acogida'
  })
  @IsDateString()
  fecha_solicitud: Date;

  @ApiProperty({
    example: EstadoAcogida.PENDIENTE,
    enum: EstadoAcogida,
    description: 'Estado inicial de la solicitud'
  })
  @IsEnum(EstadoAcogida)
  @IsOptional()
  estado?: EstadoAcogida;

  @ApiProperty({
    example: 'Tiene experiencia con gatos',
    description: 'Observaciones del usuario',
    required: false
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ example: 12, description: 'ID del animal' })
  @IsInt()
  id_animal: number;

  @ApiProperty({ example: 5, description: 'ID del usuario que solicita la acogida' })
  @IsInt()
  id_user: number;
}

export class UpdateAcogidaDto {
  @ApiPropertyOptional({
    example: '2025-04-18T14:30:00Z',
    description: 'Nueva fecha de solicitud'
  })
  @IsOptional()
  @IsDateString()
  fecha_solicitud?: Date;

  @ApiPropertyOptional({
    example: EstadoAcogida.ACEPTADA,
    enum: EstadoAcogida,
    description: 'Nuevo estado de la solicitud'
  })
  @IsOptional()
  @IsEnum(EstadoAcogida)
  estado?: EstadoAcogida;

  @ApiPropertyOptional({
    example: 'El usuario ha actualizado la información',
    description: 'Observaciones adicionales'
  })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ example: 12, description: 'ID del animal' })
  @IsOptional()
  @IsInt()
  id_animal?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID del usuario' })
  @IsOptional()
  @IsInt()
  id_user?: number;
}
