import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateApadrinamientoDto {
  @ApiProperty({
    example: '2025-04-18T14:30:00Z',
    description: 'Fecha de inicio del apadrinamiento'
  })
  @IsDateString()
  fecha_inicio: Date;

  @ApiProperty({
    example: true,
    description: 'Indica si el apadrinamiento está activo'
  })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({ example: 12, description: 'ID del animal apadrinado' })
  @IsInt()
  id_animal: number;

  @ApiProperty({ example: 5, description: 'ID del usuario que apadrina' })
  @IsInt()
  id_user: number;
}

export class UpdateApadrinamientoDto {
  @ApiPropertyOptional({
    example: '2025-04-18T14:30:00Z',
    description: 'Nueva fecha de inicio'
  })
  @IsOptional()
  @IsDateString()
  fecha_inicio?: Date;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si el apadrinamiento sigue activo'
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({ example: 12, description: 'ID del animal' })
  @IsOptional()
  @IsInt()
  id_animal?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID del usuario' })
  @IsOptional()
  @IsInt()
  id_user?: number;
}
