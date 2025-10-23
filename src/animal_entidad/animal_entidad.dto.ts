import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateAnimalEntidadDto{

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId: number;

    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // entidadesId: number;

    @IsDateString()
    fecha: Date;

    @IsString()
    ubicacion: string;
}

export class UpdateAnimalEntidad{
    @IsOptional()
    @IsInt()
    id?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId: number;

    // @IsInt()
    // @IsOptional()
    // @Min(0)
    // @Max(1)
    // entidadesId: number;

    @IsOptional()
    @IsDateString()
    fecha: Date;

    @IsOptional()
    @IsString()
    ubicacion: string;
}