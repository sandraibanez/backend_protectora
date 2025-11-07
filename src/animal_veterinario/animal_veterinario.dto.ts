import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalVeterinarioDto {

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId: number;

    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // clinicasId: number;
    @ApiProperty({ example: '2025-04-05' })
    @IsOptional()
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 'Sano' })
    @IsString()
    @IsOptional()
    diagnostico: string;
}

export class UpdateAnimalVeterinario{

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId: number;

    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // clinicasId: number;

    @ApiProperty({ example: '2024-04-25' })
    @IsOptional()
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 'Sano' })
    @IsString()
    @IsOptional()
    diagnostico: string;
}