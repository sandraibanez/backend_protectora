import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateClinica_VeterinariaDto {
    @IsString()
    nombre: string;

    @IsString()
    direccion: string;

    @IsString()
    telefono: string;

    

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    medicacionId?: number[];
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animal_veterinarioId?: number[];
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateClinica_Veterinaria {

    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    nombre?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    direccion?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    telefono?: string;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    medicacionId?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animal_veterinarioId?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}