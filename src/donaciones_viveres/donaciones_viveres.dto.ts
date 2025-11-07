import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDonaciones_ViveresDto {
  @ApiProperty({ example: 'Comida' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: 'Calle Costera' })
  @IsString()
  lugar: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  cantidad: number;

  @ApiProperty({ example: '2025-11-05' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ example: 1})
  @IsOptional()
  @IsNumber()
  protectoraId?: number;

}
export class UpdateDonaciones_Viveres {

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 'Comida' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  tipo?: string;

  @ApiProperty({ example: 'Calle 789' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  lugar?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  cantidad?: number;

  @ApiProperty({ example: '2025-11-05' })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1)
  protectoraId?: number;

  
}