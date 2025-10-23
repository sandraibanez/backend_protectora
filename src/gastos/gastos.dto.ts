import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateGastosDto {
    @IsString()
    tipo: string;

    @IsInt()
    conteo_gatos: number;

    @IsString()
    lugar: string;

    @IsDateString()
    fecha: Date;

    @IsInt()
    cantidad: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateGastos{

    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    tipo?: string;

    @IsInt()
    @IsOptional()
    @Length(1, 50)
    cantidad?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    lugar?: string;

    @IsOptional()
    @IsDateString()
    fecha?: Date;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}