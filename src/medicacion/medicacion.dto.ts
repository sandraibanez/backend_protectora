import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';

export class CreateMedicacionDto {
    @IsString()
    nombre: string;

    @IsString()
    dosis: string;

    @IsString()
    foto_receta: string;

    @IsDateString()
    f_inicio: Date;

    @IsDateString()
    f_fin: Date;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animalesId?: number[];
}
export class UpdateMedicacion {

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
    dosis?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    foto_receta?: string;

    @IsOptional()
    @IsDateString()
    f_inicio?: Date;

    @IsOptional()
    @IsDateString()
    f_fin?: Date;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animalesId?: number;
}