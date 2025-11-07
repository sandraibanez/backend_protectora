import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnimalEntidadDto{

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId: number;

    //@({ example: 1 })
    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // entidadesId: number;

    @ApiProperty({ example: '2025-11-25' })
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 'Calle 568' })
    @IsString()
    ubicacion: string;
}

export class UpdateAnimalEntidad{
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

    //@ApiProperty({ example: 1 })
    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // entidadesId: number;

    @ApiProperty({ example: '2025-11-30' })
    @IsOptional()
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 'Calle 568' })
    @IsOptional()
    @IsString()
    ubicacion: string;
}