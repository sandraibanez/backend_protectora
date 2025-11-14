import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateIngresoDto {
  @ApiProperty({ example: 'Donación', description: 'Tipo de ingreso recibido (donación, subvención, evento, etc.)' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: '2025-06-10', description: 'Fecha en la que se recibió el ingreso' })
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: 500, description: 'Cantidad económica del ingreso en euros' })
  @IsInt()
  @Min(0)
  cantidad: number;

  @ApiProperty({ example: 1, description: 'ID de la protectora asociada al ingreso' })
  @IsInt()
  protectora: number;
}

export class UpdateIngresoDto {
  @ApiProperty({ example: 3, description: 'ID del ingreso' })
  @IsOptional()
  @IsInt()
  id_ingreso?: number;

  @ApiProperty({ example: 'Subvención municipal', description: 'Nuevo tipo de ingreso' })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({ example: 800, description: 'Nueva cantidad económica del ingreso' })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;

  @ApiProperty({ example: '2025-06-15', description: 'Nueva fecha del ingreso'})
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty({ example: 1, description: 'ID de la protectora asociada' })
  @IsOptional()
  @IsInt()
  protectora?: number;
}
