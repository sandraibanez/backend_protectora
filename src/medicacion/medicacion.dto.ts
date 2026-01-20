import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateMedicacionDto {
  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Analgésico y antipirético', description: 'Descripción o información del medicamento' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 'oral / inyectable', description: 'Vía de administración del medicamento' })
  @IsOptional()
  @IsString()
  via_administracion?: string;

  @ApiProperty({ example: 'receta.png', description: 'Archivo o ruta de la receta médica' })
  @IsOptional()
  @IsString()
  foto_receta?: string;
}

export class UpdateMedicacionDto {
  @ApiProperty({ example: 1, description: 'ID de la medicación a actualizar' })
  @IsOptional()
  id_medicacion?: number;

  @ApiProperty({ example: 'Amoxicilina', description: 'Nuevo nombre del medicamento' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'Antibiótico de amplio espectro', description: 'Descripción actualizada del medicamento' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 'oral', description: 'Nueva vía de administración' })
  @IsOptional()
  @IsString()
  via_administracion?: string;

  @ApiProperty({ example: 'nueva_receta.png', description: 'Archivo actualizado de la receta médica' })
  @IsOptional()
  @IsString()
  foto_receta?: string;
}
