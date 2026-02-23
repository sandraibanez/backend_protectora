import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHistorialMedicoDto {
  @ApiProperty({
    example: '2025-04-18',
    description: 'Fecha de la consulta veterinaria'
  })
  @IsDateString()
  fecha: Date;

  @ApiPropertyOptional({
    example: 'Revisión post-operatoria',
    description: 'Motivo de la consulta'
  })
  @IsString()
  @IsOptional()
  motivo_consulta?: string;

  @ApiProperty({
    example: 'Herida cicatrizando correctamente',
    description: 'Diagnóstico del veterinario'
  })
  @IsString()
  diagnostico: string;

  @ApiPropertyOptional({
    example: 'Aplicar crema antibiótica dos veces al día',
    description: 'Tratamiento o recomendaciones'
  })
  @IsString()
  @IsOptional()
  tratamiento?: string;

  @ApiPropertyOptional({
    example: 'Paracetamol 500mg cada 12h durante 5 días',
    description: 'Medicamentos prescritos con dosis y duración'
  })
  @IsString()
  @IsOptional()
  medicamentos?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el animal está actualmente en tratamiento'
  })
  @IsBoolean()
  @Type(() => Boolean)
  en_tratamiento: boolean;

  @ApiPropertyOptional({
    example: 'Programar revisión en 2 semanas',
    description: 'Observaciones adicionales'
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ example: 12, description: 'ID del animal' })
  @IsInt()
  @Type(() => Number)
  id_animal: number;

  @ApiProperty({ example: 5, description: 'ID del veterinario' })
  @IsInt()
  @Type(() => Number)
  id_veterinario: number;
}

export class UpdateHistorialMedicoDto {
  @ApiPropertyOptional({
    example: '2025-04-20',
    description: 'Nueva fecha de consulta'
  })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiPropertyOptional({
    example: 'Control de rutina',
    description: 'Motivo de la consulta'
  })
  @IsOptional()
  @IsString()
  motivo_consulta?: string;

  @ApiPropertyOptional({
    example: 'Estado general bueno',
    description: 'Diagnóstico actualizado'
  })
  @IsOptional()
  @IsString()
  diagnostico?: string;

  @ApiPropertyOptional({
    example: 'Continuar tratamiento',
    description: 'Tratamiento actualizado'
  })
  @IsOptional()
  @IsString()
  tratamiento?: string;

  @ApiPropertyOptional({
    example: 'Medicamento suspendido',
    description: 'Medicamentos actualizados'
  })
  @IsOptional()
  @IsString()
  medicamentos?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Estado del tratamiento'
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  en_tratamiento?: boolean;

  @ApiPropertyOptional({
    example: 'Mejoría notable',
    description: 'Observaciones adicionales'
  })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ example: 12, description: 'ID del animal' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_animal?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID del veterinario' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_veterinario?: number;
}
