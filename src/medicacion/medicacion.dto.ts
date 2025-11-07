import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicacionDto {

    @ApiProperty({ example: 'Paracetamol' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: '1mg' })
    @IsString()
    dosis: string;

    @ApiProperty({ example: 'Receta.png' })
    @IsString()
    foto_receta: string;

    @ApiProperty({ example: '2025-11-01' })
    @IsDateString()
    f_inicio: Date;

    @ApiProperty({ example: '2025-11-30' })
    @IsDateString()
    f_fin: Date;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animalesId?: number[];
}
export class UpdateMedicacion {

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Ibuprofeno' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    nombre?: string;

    @ApiProperty({ example: '1mg' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    dosis?: string;

    @ApiProperty({ example: 'Receta.png' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    foto_receta?: string;

    @ApiProperty({ example: '2025-11-01' })
    @IsOptional()
    @IsDateString()
    f_inicio?: Date;

    @ApiProperty({ example: '2025-11-30' })
    @IsOptional()
    @IsDateString()
    f_fin?: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId?: number;
}