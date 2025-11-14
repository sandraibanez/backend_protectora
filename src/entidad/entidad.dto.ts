import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateEntidadDto {
  @ApiProperty({ example: 'Protectora Felina', description: 'Nombre de la entidad' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Civil', description: 'Tipo de entidad (por ejemplo: Civil, Municipal...)' })
  @IsString()
  tipo: string;

}

export class UpdateEntidadDto {

  @ApiProperty({ example: 1, description: 'ID de la entidad a actualizar' })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 'Refugio Canino Esperanza', description: 'Nombre actualizado de la entidad' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'Municipal', description: 'Tipo actualizado de la entidad' })
  @IsOptional()
  @IsString()
  tipo?: string;

}
