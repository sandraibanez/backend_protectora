import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateProtectoraDto {
  @ApiProperty({ example: 'Protectora Patitas Felices', description: 'Nombre de la protectora' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Calle de la Esperanza 45, Valencia', description: 'Dirección física de la protectora' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: 962345678, description: 'Teléfono de contacto de la protectora' })
  @IsInt()
  telefono: number;

  @ApiProperty({ example: [1, 2], description: 'IDs de veterinarios asociados'})
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  veterinarios?: number[];
}

export class UpdateProtectoraDto {
  @ApiProperty({ example: 1, description: 'ID de la protectora a actualizar' })
  @IsOptional()
  @IsInt()
  id_protectora?: number;

  @ApiProperty({ example: 'Protectora Patitas Felices', description: 'Nombre de la protectora' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'Calle de la Esperanza 45, Valencia', description: 'Dirección física de la protectora' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ example: 962345678, description: 'Teléfono de contacto' })
  @IsOptional()
  @IsInt()
  telefono?: number;

  @ApiProperty({ example: [1, 2], description: 'IDs de donaciones de víveres' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  donacionesViveres?: number[];

  @ApiProperty({ example: [1, 2], description: 'IDs de gastos asociados' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  gastos?: number[];

  @ApiProperty({ example: [1, 3], description: 'IDs de ingresos asociados' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ingresos?: number[];

  @ApiProperty({ example: [1, 2], description: 'IDs de veterinarios asociados' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  veterinarios?: number[];
}
