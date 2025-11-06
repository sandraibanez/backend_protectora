import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUsersDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ example: 'Lola' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'cont123' })
    @IsString()
    contrasenya: string;

    @ApiProperty({ example: 'Calle 123' })
    @IsString()
    direccion: string;

    @ApiProperty({ example: 'lola@gmail.com' })
    @IsString()
    email: string;

    @ApiProperty({ example: 12345 })
    @IsInt()
    telefono: number;

    @ApiProperty({ example: 98765 })
    @IsInt()
    DNI: number;

    @ApiProperty({ example: 'usuario' })
    @IsString()
    rol: string;
   
}
export class UpdateUsers{

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Lola' })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Nueva Cont' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    contrasenya: string;

    @ApiProperty({ example: 'Nueva Calle 123' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    direccion?: string;

    @ApiProperty({ example: 'nuevoemail@gmail.com' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    email?: string;

    @ApiProperty({ example: 12345 })
    @IsOptional()
    @IsInt()
    elefono?: number;

    @ApiProperty({ example: 98765 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    DNI?: number;

    @ApiProperty({ example: 'usuario' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    rol?: string;
}