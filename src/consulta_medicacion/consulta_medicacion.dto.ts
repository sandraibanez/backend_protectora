import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateConsultaMedicacionDto {
  @ApiProperty({ example: 1, description: 'ID de la consulta (animal-veterinario)' })
  @IsInt()
  consulta: number;

  @ApiProperty({ example: 2, description: 'ID del medicamento administrado' })
  @IsInt()
  medicacion: number;

  @ApiProperty({ example: '1 comprimido cada 12 horas', description: 'Dosis administrada' })
  @IsString()
  dosis: string;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento' })
  @IsDateString()
  f_inicio: Date;

  @ApiProperty({ example: '2025-11-10', description: 'Fecha de fin del tratamiento' })
  @IsDateString()
  f_fin: Date;

  @ApiProperty({ example: 'Administrar con comida', description: 'Notas adicionales del veterinario' })
  @IsOptional()
  @IsString()
  notas?: string;
}

export class UpdateConsultaMedicacionDto {

  @ApiPropertyOptional({ example: 1, description: 'ID de la consulta (animal-veterinario)' })
  @IsOptional()
  @IsInt()
  consulta?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID del medicamento administrado' })
  @IsOptional()
  @IsInt()
  medicacion?: number;

  @ApiPropertyOptional({ example: '1 comprimido cada 12 horas', description: 'Dosis administrada' })
  @IsOptional()
  @IsString()
  dosis?: string;

  @ApiPropertyOptional({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento' })
  @IsOptional()
  @IsDateString()
  f_inicio?: Date;

  @ApiPropertyOptional({ example: '2025-11-10', description: 'Fecha de fin del tratamiento' })
  @IsOptional()
  @IsDateString()
  f_fin?: Date;

  @ApiPropertyOptional({ example: 'Administrar con comida', description: 'Notas adicionales del veterinario' })
  @IsOptional()
  @IsString()
  notas?: string;
}
