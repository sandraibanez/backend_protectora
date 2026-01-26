import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDateString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateProtectoraDto {
  @ApiProperty({ example: 'Protectora Patitas Felices', description: 'Nombre de la protectora' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Calle de la Esperanza 45, Valencia', description: 'Dirección física de la protectora' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: 962345678, description: 'Teléfono de contacto de la protectora' })
  @Type(() => Number)
  @IsInt()
  telefono: number;

  @ApiProperty({ example: [1, 2], description: 'IDs de veterinarios asociados'})
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  veterinarios?: number[];
}

export class UpdateProtectoraDto {
  @ApiPropertyOptional({ example: 1, description: 'ID de la protectora a actualizar' })
  @IsOptional()
  @IsInt()
  id_protectora?: number;

  @ApiPropertyOptional({ example: 'Protectora Patitas Felices', description: 'Nombre de la protectora' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Calle de la Esperanza 45, Valencia', description: 'Dirección física de la protectora' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: 962345678, description: 'Teléfono de contacto' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  telefono?: number;

  @ApiPropertyOptional({ example: [1, 2], description: 'IDs de donaciones de víveres' })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  donacionesViveres?: number[];

  @ApiPropertyOptional({ example: [1, 2], description: 'IDs de gastos asociados' })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  gastos?: number[];

  @ApiPropertyOptional({ example: [1, 3], description: 'IDs de ingresos asociados' })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  ingresos?: number[];

  @ApiPropertyOptional({ example: [1, 2], description: 'IDs de veterinarios asociados' })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  veterinarios?: number[];
}
