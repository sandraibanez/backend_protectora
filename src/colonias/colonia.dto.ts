import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateColoniaDto {
    @IsString()
    localizacion: string;

    @IsInt()
    conteo_gatos: number;

    @IsString()
    foto: string;

    @IsDateString()
    horario_alimento: Date;

    @IsInt()
    cantidad_comida: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateColonia{

    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    localizacion?: string;

    @IsInt()
    @IsOptional()
    @Length(1, 50)
    conteo_gatos?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    foto?: string;

    @IsOptional()
    @IsDateString()
    horario_alimento?: Date;

    @IsInt()
    @IsOptional()
    @IsDateString()
    cantidad_comida?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}