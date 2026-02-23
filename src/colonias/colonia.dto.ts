import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateColoniaDto {
  @ApiProperty({ example: 'Calle 789', description: 'Ubicación de la colonia de gatos' })
  @IsString()
  localizacion: string;

  @ApiPropertyOptional({ example: 15, description: 'Número de gatos en la colonia' })
  @IsOptional()
  @IsInt()
  conteo_gatos?: number;

  @ApiPropertyOptional({ example: 40.416775, description: 'Latitud GPS de la colonia' })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({ example: -3.703790, description: 'Longitud GPS de la colonia' })
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiProperty({ example: 'gato.png', description: 'Foto representativa de la colonia', required: false })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({ example: '2025-05-16', description: 'Horario en que se alimenta la colonia' })
  @IsDateString()
  horario_alimento: Date;

  @ApiProperty({ example: 1, description: 'ID de la protectora asociada', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}

export class UpdateColoniaDto {

  @ApiPropertyOptional({ example: 'Calle 789', description: 'Ubicación de la colonia de gatos', required: false })
  @IsOptional()
  @IsString()
  localizacion?: string;

  @ApiPropertyOptional({ example: 15, description: 'Número de gatos en la colonia' })
  @IsOptional()
  @IsInt()
  conteo_gatos?: number;

  @ApiPropertyOptional({ example: 40.416775, description: 'Latitud GPS de la colonia' })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({ example: -3.703790, description: 'Longitud GPS de la colonia' })
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiPropertyOptional({ example: 'gato.png', description: 'Foto representativa de la colonia', required: false })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional({ example: '2025-05-16', description: 'Horario en que se alimenta la colonia', required: false })
  @IsOptional()
  @IsDateString()
  horario_alimento?: Date;

  @ApiPropertyOptional({ example: 1, description: 'ID de la protectora asociada', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}
