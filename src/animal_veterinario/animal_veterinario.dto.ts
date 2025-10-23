import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateAnimalVeterinarioDto {

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

    @IsOptional()
    @IsDateString()
    fecha: Date;

    @IsString()
    @IsOptional()
    diagnostico: string;
}

export class UpdateAnimalVeterinario{
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
    // clinicasId: number;

    @IsOptional()
    @IsDateString()
    fecha: Date;

    @IsString()
    @IsOptional()
    diagnostico: string;
}