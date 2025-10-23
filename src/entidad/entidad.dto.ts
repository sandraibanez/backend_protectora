import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateEntidadDto {
    @IsString()
    nombre: string;

    @IsString()
    tipo: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animal_entidadId?: number[];
}
export class UpdateEntidad{

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
    tipo?: string;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animal_entidadId?: number;
}