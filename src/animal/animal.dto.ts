import { IsString, IsDateString, IsBoolean, IsOptional, IsArray, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Nala', description: 'Nombre del animal' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Golden Retriever', description: 'Raza del animal' })
  @IsString()
  raza: string;

  @ApiProperty({ example: 'Nala.png', description: 'Foto del animal' })
  @IsString()
  foto: string;

  @ApiProperty({ example: 'Hembra', description: 'Sexo del animal' })
  @IsString()
  sexo: string;

  @ApiProperty({ example: 'Perro', description: 'Especie del animal' })
  @IsString()
  especie: string;

  @ApiProperty({ example: '2025-04-18', description: 'Fecha de nacimiento del animal' })
  @IsDateString()
  f_nacimiento: Date;

  @ApiProperty({ example: 'Sano', description: 'Estado actual del animal' })
  @IsString()
  estado: string;

  @ApiProperty({ example: 'NalaPerro', description: 'Número de chip del animal' })
  @IsString()
  chip: string;

  @ApiProperty({ example: true, description: 'Indica si el animal está esterilizado' })
  @Type(() => Boolean)
  @IsBoolean()
  esterilizado: boolean;

  @ApiProperty({ example: 1, description: 'ID de la protectora a la que pertenece el animal' })
  @Type(() => Number)
  @IsInt()
  protectora?: number;

}

export class UpdateAnimalDto {
  @ApiPropertyOptional({ example: 'Firulais', description: 'Nombre del animal'})
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Pastor Alemán', description: 'Raza del animal'})
  @IsOptional()
  @IsString()
  raza?: string;

  @ApiPropertyOptional({ example: 'Firulais.png', description: 'Foto del animal' })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional({ example: 'Macho', description: 'Sexo del animal'})
  @IsOptional()
  @IsString()
  sexo?: string;

  @ApiPropertyOptional({ example: 'Perro', description: 'Especie del animal'})
  @IsOptional()
  @IsString()
  especie?: string;

  @ApiPropertyOptional({ example: 'Enfermo', description: 'Estado del animal'})
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiPropertyOptional({ example: '123456789', description: 'Número de chip'})
  @IsOptional()
  @IsString()
  chip?: string;

  @ApiPropertyOptional({ example: '2021-06-15', description: 'Fecha de nacimiento'})
  @IsOptional()
  @IsDateString()
  f_nacimiento?: Date;

  @ApiPropertyOptional({ example: true, description: 'Esterilizado'})
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  esterilizado?: boolean;

  @ApiPropertyOptional({ example: 1, description: 'ID protectora'})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  protectora?: number;
}
