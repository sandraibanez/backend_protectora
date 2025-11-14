import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateDonacionesViveresDto {
  @ApiProperty({ example: 'Alimento', description: 'Tipo de víveres donados' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: 'Calle Mayor 123', description: 'Lugar donde se donaron los víveres' })
  @IsString()
  lugar: string;

  @ApiProperty({ example: 50, description: 'Cantidad de víveres donados' })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: '2025-06-01', description: 'Fecha de la donación' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 1, description: 'ID de la protectora relacionada', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}

export class UpdateDonacionesViveresDto {
  @ApiProperty({ example: 2, description: 'ID de la donación a actualizar', required: false })
  @IsOptional()
  @IsInt()
  id_donacion?: number;

  @ApiProperty({ example: 'Medicinas', description: 'Tipo de víveres a actualizar', required: false })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({ example: 'Plaza del Sol 45', description: 'Lugar de la donación a actualizar', required: false })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiProperty({ example: 30, description: 'Cantidad de víveres a actualizar', required: false })
  @IsOptional()
  @IsInt()
  cantidad?: number;

  @ApiProperty({ example: '2025-06-05', description: 'Fecha de la donación a actualizar', required: false })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiProperty({ example: 2, description: 'ID de la protectora a actualizar', required: false })
  @IsOptional()
  @IsInt()
  protectora?: number;
}
