import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";
import { TipoRelacion } from "./relacion_persona_animal.entity";

export class CreateRelacionPersonaAnimalDto {
  @IsDateString()
  fecha: Date;

  @IsEnum(TipoRelacion)
  accion: TipoRelacion;

  @IsInt()
  personaId: number;

  @IsInt()
  animalId: number;
}

export class UpdateRelacionPersonaAnimalDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @IsOptional()
  @IsEnum(TipoRelacion)
  accion?: TipoRelacion;

  @IsOptional()
  @IsInt()
  personaId?: number;

  @IsOptional()
  @IsInt()
  animalId?: number;
}
