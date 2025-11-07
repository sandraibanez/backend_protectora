import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";
import { TipoRelacion } from "./relacion_persona_animal.entity";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRelacionPersonaAnimalDto {

  @ApiProperty({ example: '2025-11-05' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 'acoge' })
  @IsEnum(TipoRelacion)
  accion: TipoRelacion;

  @ApiProperty({ example: 1 })
  @IsInt()
  personaId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  animalId: number;
}

export class UpdateRelacionPersonaAnimalDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: '2025-11-07' })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiProperty({ example: 'adopta' })
  @IsOptional()
  @IsEnum(TipoRelacion)
  accion?: TipoRelacion;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  personaId?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  animalId?: number;
}
