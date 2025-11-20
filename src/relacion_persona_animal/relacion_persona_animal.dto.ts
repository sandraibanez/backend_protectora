import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoRelacion } from './relacion_persona_animal.entity';

export class CreateRelacionPersonaAnimalDto {
  @ApiProperty({
    example: '2025-04-15',
    description: 'Fecha en la que se establece la relación entre la persona y el animal',
  })
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    enum: TipoRelacion,
    example: TipoRelacion.ADOPTA,
    description: 'Tipo de relación entre la persona y el animal',
  })
  @IsEnum(TipoRelacion)
  accion: TipoRelacion;

  @ApiProperty({
    example: 3,
    description: 'ID del usuario (persona) que realiza la acción sobre el animal',
  })
  @IsInt()
  persona: number;

  @ApiProperty({
    example: 1,
    description: 'ID del animal implicado en la relación',
  })
  @IsInt()
  animal: number;
}

export class UpdateRelacionPersonaAnimalDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID único de la relación (solo para actualizaciones)',
  })
  @IsOptional()
  @IsInt()
  id_relacion?: number;

  @ApiPropertyOptional({
    example: '2025-05-01',
    description: 'Nueva fecha de la relación, si se desea actualizar',
  })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiPropertyOptional({
    enum: TipoRelacion,
    example: TipoRelacion.ACOGE,
    description: 'Nuevo tipo de relación entre la persona y el animal',
  })
  @IsOptional()
  @IsEnum(TipoRelacion)
  accion?: TipoRelacion;

  @ApiPropertyOptional({
    example: 4,
    description: 'Nuevo ID del usuario (persona), si se desea cambiar',
  })
  @IsOptional()
  @IsInt()
  persona?: number;

  @ApiPropertyOptional({
    example: 9,
    description: 'Nuevo ID del animal implicado, si se desea cambiar',
  })
  @IsOptional()
  @IsInt()
  animal?: number;
}
