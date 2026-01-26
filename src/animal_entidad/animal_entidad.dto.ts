import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateAnimalEntidadDto {
  @ApiProperty({ example: '2025-04-18', description: 'Fecha de registro del animal en la entidad' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 'Calle 568', description: 'Ubicación del animal dentro de la entidad' })
  @IsString()
  ubicacion: string;

  @ApiProperty({ example: 1, description: 'ID del animal' })
  @IsInt()
  animal: number;

  @ApiProperty({ example: 2, description: 'ID de la entidad' })
  @IsInt()
  entidad: number;
}

export class UpdateAnimalEntidadDto {

  @ApiPropertyOptional({ example: 1, description: 'ID del animal' })
  @IsOptional()
  @IsInt()
  animal?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID de la entidad' })
  @IsOptional()
  @IsInt()
  entidad?: number;

  @ApiPropertyOptional({ example: '2025-05-01', description: 'Fecha de actualización del registro' })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiPropertyOptional({ example: 'Calle 111', description: 'Ubicación actual del animal dentro de la entidad' })
  @IsOptional()
  @IsString()
  ubicacion?: string;
}