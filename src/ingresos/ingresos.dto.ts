import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateIngresosDto {
    @IsInt()
    id: number;

    @IsString()
    tipo: string;

    @IsDateString()
    fecha: Date;

    @IsInt()
    cantidad: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateIngresos{

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

    @IsOptional()
    @IsDateString()
    fecha?: Date;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}