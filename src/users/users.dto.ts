import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';

export class CreateUsersDto {

    @IsInt()
    id: number;

    @IsString()
    nombre: string;

    @IsString()
    contrasenya: string;

    @IsString()
    direccion: string;

    @IsString()
    email: string;

    @IsInt()
    telefono: number;

    @IsInt()
    DNI: Number;

    @IsString()
    rol: string;
   
}
export class UpdateUsers{

    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    contrasenya: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    direccion?: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    email?: string;

    @IsOptional()
    @IsInt()
    Telefono?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    DNI?: number;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    rol?: string;
}