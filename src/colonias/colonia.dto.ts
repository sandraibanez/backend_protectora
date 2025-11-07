import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColoniaDto {

    @ApiProperty({ example: 'Calle 789' })
    @IsString()
    localizacion: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    conteo_gatos: number;

    @ApiProperty({ example: 'gato.png' })
    @IsString()
    foto: string;

    @ApiProperty({ example: '2025-05-16' })
    @IsDateString()
    horario_alimento: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    cantidad_comida: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateColonia{

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Calle 456' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    localizacion?: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Length(1, 50)
    conteo_gatos?: number;

    @ApiProperty({ example: 'gato.png' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    foto?: string;

    @ApiProperty({ example: '2025-05-16' })
    @IsOptional()
    @IsDateString()
    horario_alimento?: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @IsDateString()
    cantidad_comida?: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}