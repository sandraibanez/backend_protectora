import { IsString, IsOptional, IsArray, IsNumber, IsInt, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVeterinarioDto {
  @ApiProperty({
    example: 'Clínica Patitas Sanas',
    description: 'Nombre del veterinario o clínica veterinaria',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'Avenida de la Salud 12, Valencia',
    description: 'Dirección del veterinario o clínica veterinaria',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    example: 962345678,
    description: 'Número de teléfono del veterinario o clínica veterinaria',
  })
  @Type(() => Number)
  @IsInt()
  telefono: number;

  @ApiPropertyOptional({
    example: [1],
    description: 'IDs de las protectoras asociadas al veterinario (opcional)',
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  protectoras?: number[];
}

export class UpdateVeterinarioDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID del veterinario a actualizar',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_veterinario?: number;

  @ApiPropertyOptional({
    example: 'Clínica Animalia',
    description: 'Nombre actualizado del veterinario o clínica veterinaria',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Calle Veterinaria 45, Alicante',
    description: 'Dirección actualizada del veterinario o clínica veterinaria',
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({
    example: 965112233,
    description: 'Teléfono actualizado del veterinario o clínica veterinaria',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  telefono?: number;

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'IDs de las protectoras asociadas al veterinario (opcional)',
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  protectoras?: number[];
}
