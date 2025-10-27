import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateProtectorasDto {

    @IsInt()
    id: number;

    @IsString()
    nombre: string;

    @IsString()
    direccion: string;

    @IsInt()
    telefono: number;


}
export class UpdateProtectoras{

    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    direccion?: string;

    @IsOptional()
    @IsInt()
    telefono?: number;

}