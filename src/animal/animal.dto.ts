import { IsString, IsDateString, IsBoolean, IsOptional, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsBoolean()
  esterilizado: boolean;

  @ApiProperty({ example: 1, description: 'ID de la protectora a la que pertenece el animal' })
  @IsInt()
  protectora?: number;

  @ApiProperty({ example: [1,2], description: 'IDs de medicaciones asignadas al animal'})
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  medicaciones?: number[];

}

export class UpdateAnimalDto {
  @ApiProperty({ example: 1, description: 'ID del animal'})
  @IsOptional()
  @IsInt()
  id_animal?: number;

  @ApiProperty({ example: 'Firulais', description: 'Nombre del animal'})
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'Pastor Alemán', description: 'Raza del animal'})
  @IsOptional()
  @IsString()
  raza?: string;

  @ApiProperty({ example: 'Firulais.png', description: 'Foto del animal' })
  @IsString()
  foto?: string;

  @ApiProperty({ example: 'Macho', description: 'Sexo del animal'})
  @IsOptional()
  @IsString()
  sexo?: string;

  @ApiProperty({ example: 'Perro', description: 'Especie del animal'})
  @IsOptional()
  @IsString()
  especie?: string;

  @ApiProperty({ example: 'Enfermo', description: 'Estado del animal'})
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty({ example: '123456789', description: 'Número de chip'})
  @IsOptional()
  @IsString()
  chip?: string;

  @ApiProperty({ example: '2021-06-15', description: 'Fecha de nacimiento'})
  @IsOptional()
  @IsDateString()
  f_nacimiento?: Date;

  @ApiProperty({ example: true, description: 'Esterilizado'})
  @IsOptional()
  @IsBoolean()
  esterilizado?: boolean;

  @ApiProperty({ example: 1, description: 'ID protectora'})
  @IsOptional()
  @IsInt()
  protectora?: number;

  @ApiProperty({ example: [1,2], description: 'IDs de medicaciones'})
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  medicaciones?: number[];
}
