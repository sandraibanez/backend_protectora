import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateMedicacionDto {
  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento que se administrará' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: '1mg cada 8 horas', description: 'Dosis y frecuencia del medicamento' })
  @IsString()
  dosis: string;

  @ApiProperty({ example: 'receta.png', description: 'Nombre o ruta del archivo con la receta médica' })
  @IsOptional()
  @IsString()
  foto_receta?: string;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento' })
  @IsDateString()
  f_inicio: Date;

  @ApiProperty({ example: '2025-11-30', description: 'Fecha de finalización del tratamiento' })
  @IsDateString()
  f_fin: Date;

  @ApiProperty({ example: [1, 2], description: 'IDs de los animales que reciben esta medicación' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  animales?: number[];
}

export class UpdateMedicacionDto {
  @ApiProperty({ example: 1, description: 'ID de la medicación a actualizar' })
  @IsOptional()
  @IsInt()
  id_medicacion?: number;

  @ApiProperty({ example: 'Amoxicilina', description: 'Nuevo nombre del medicamento' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: '500mg cada 12 horas', description: 'Nueva dosis o frecuencia del medicamento' })
  @IsOptional()
  @IsString()
  dosis?: string;

  @ApiProperty({ example: 'nueva_receta.png', description: 'Archivo actualizado de la receta médica' })
  @IsOptional()
  @IsString()
  foto_receta?: string;

  @ApiProperty({ example: '2025-12-01', description: 'Nueva fecha de inicio del tratamiento' })
  @IsOptional()
  @IsDateString()
  f_inicio?: Date;

  @ApiProperty({ example: '2025-12-20', description: 'Nueva fecha de fin del tratamiento' })
  @IsOptional()
  @IsDateString()
  f_fin?: Date;

  @ApiProperty({ example: [3], description: 'IDs de animales actualizados asociados a la medicación' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  animales?: number[];
}
