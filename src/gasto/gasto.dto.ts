import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateGastoDto {
  @ApiProperty({
    example: 'Veterinario',
    description: 'Tipo de gasto realizado (ejemplo: Veterinario, Comida, Material)',
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    example: '2025-06-10',
    description: 'Fecha en la que se realizó el gasto',
  })
  @IsDateString()
  fecha: string;

  @ApiProperty({
    example: 150,
    description: 'Cantidad económica del gasto en euros',
  })
  @IsInt()
  @Min(0)
  cantidad: number;

  @ApiProperty({
    example: 3,
    description: 'ID de la protectora asociada al gasto',
  })
  @IsInt()
  protectora: number;
}

export class UpdateGastoDto {
  @ApiProperty({
    example: 1,
    description: 'ID del gasto',
  })
  @IsOptional()
  @IsInt()
  id_gasto?: number;

  @ApiProperty({
    example: 'Comida para gatos',
    description: 'Tipo de gasto actualizado',
  })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({
    example: 80,
    description: 'Nueva cantidad económica del gasto',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;

  @ApiProperty({
    example: '2025-07-01',
    description: 'Nueva fecha del gasto',
  })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty({
    example: 3,
    description: 'ID de la protectora asociada',
  })
  @IsOptional()
  @IsInt()
  protectora?: number;
}
