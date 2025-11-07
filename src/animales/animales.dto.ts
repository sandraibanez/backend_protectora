import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnimalDto {
  @ApiProperty({ example: 'Nala' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Golden Retriever' })
  @IsString()
  raza: string;

  @ApiProperty({ example: 'Hembra ' })
  @IsString()
  sexo: string;

  @ApiProperty({ example: 'Nala.png' })
  @IsString()
  foto: string;

  @ApiProperty({ example: 'Perro' })
  @IsString()
  especie: string;

  @ApiProperty({ example: '2025-04-18' })
  @IsDateString()
  f_nacimiento: Date;

  @ApiProperty({ example: 'Sana' })
  @IsString()
  estado: string;

  @ApiProperty({ example: 'NalaPerro' })
  @IsString()
  chip: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  esterilizado: boolean;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  protectoraId?: number;

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // personasIds?: number[];

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  medicacionIds?: number[];

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // relacionesIds?: number[];

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // animalEntidadIds?: number[];

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // animalVeterinarioIds?: number[];
}
export class UpdateAnimales {
  
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 'Nala' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  nombre?: string;

  @ApiProperty({ example: 'Golden Retriever' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  raza?: string;

  @ApiProperty({ example: 'Hembra' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  sexo?: string;

  @ApiProperty({ example: 'Nala.png' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  foto?: string;

  @ApiProperty({ example: 'Perro' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  especie?: string;

  @ApiProperty({ example: 'Sana' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  estado?: string;

  @ApiProperty({ example: 'NalaPerro' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  chip?: string;

  @ApiProperty({ example: '2025-04-18' })
  @IsOptional()
  @IsDateString()
  f_nacimiento?: Date;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  esterilizado?: boolean;

  // @IsInt()
  // @IsOptional()
  // @Min(0)
  // @Max(1)
  // protectoraId?: number;

  // @IsInt()
  // @IsOptional()
  // @Min(0)
  // @Max(1)
  // @IsArray()
  // personasIds?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  @IsArray()
  medicacionIds?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  @IsArray()
  relacionesIds?: number;

  // @IsInt()
  // @IsOptional()
  // @Min(0)
  // @Max(1)
  // @IsArray()
  // animalEntidadIds?: number;

  // @IsInt()
  // @IsOptional()
  // @Min(0)
  // @Max(1)
  // @IsArray()
  // animalVeterinarioIds?: number;
}