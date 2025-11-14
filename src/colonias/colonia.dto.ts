import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateColoniaDto {
  @ApiProperty({ example: 'Calle 789', description: 'Ubicación de la colonia de gatos' })
  @IsString()
  localizacion: string;

  @ApiProperty({ example: 1, description: 'Número de gatos en la colonia' })
  @IsInt()
  conteo_gatos: number;

  @ApiProperty({ example: 'gato.png', description: 'Foto representativa de la colonia', required: false })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({ example: '2025-05-16', description: 'Horario en que se alimenta la colonia' })
  @IsDateString()
  horario_alimento: Date;

  @ApiProperty({ example: 1, description: 'Cantidad de comida proporcionada' })
  @IsInt()
  cantidad_comida: number;

  @ApiProperty({ example: 1, description: 'ID de la protectora asociada', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}

export class UpdateColoniaDto {
  @ApiProperty({ example: 1, description: 'ID de la colonia', required: false })
  @IsOptional()
  @IsInt()
  id_colonia?: number;

  @ApiProperty({ example: 'Calle 789', description: 'Ubicación de la colonia de gatos', required: false })
  @IsOptional()
  @IsString()
  localizacion?: string;

  @ApiProperty({ example: 1, description: 'Número de gatos en la colonia', required: false })
  @IsOptional()
  @IsInt()
  conteo_gatos?: number;

  @ApiProperty({ example: 'gato.png', description: 'Foto representativa de la colonia', required: false })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({ example: '2025-05-16', description: 'Horario en que se alimenta la colonia', required: false })
  @IsOptional()
  @IsDateString()
  horario_alimento?: Date;

  @ApiProperty({ example: 1, description: 'Cantidad de comida proporcionada', required: false })
  @IsOptional()
  @IsInt()
  cantidad_comida?: number;

  @ApiProperty({ example: 1, description: 'ID de la protectora asociada', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}
