import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  nombre: string;

  @IsString()
  raza: string;

  @IsString()
  sexo: string;

  @IsString()
  especie: string;

  @IsDateString()
  f_nacimiento: Date;

  @IsString()
  estado: string;

  @IsString()
  chip: string;

  @IsBoolean()
  esterilizado: boolean;

  @IsOptional()
  @IsNumber()
  protectoraId?: number;

  // @IsOptional()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // personasIds?: number[];

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
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  nombre?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  raza?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  sexo?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  especie?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  estado?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  chip?: string;

  @IsOptional()
  @IsDateString()
  f_nacimiento?: Date;

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

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  @IsArray()
  medicacionIds?: number;


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