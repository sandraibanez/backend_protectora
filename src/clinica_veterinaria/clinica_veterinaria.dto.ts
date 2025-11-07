import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinica_VeterinariaDto {
    @ApiProperty({ example: 'Patitas' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Calle Principal' })
    @IsString()
    direccion: string;

    @ApiProperty({ example: 123456789 })
    @IsString()
    telefono: string;

    
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    medicacionId?: number[];

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animal_veterinarioId?: number[];

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateClinica_Veterinaria {

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Patitas' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    nombre?: string;

    @ApiProperty({ example: 'Calle Secundaria' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    direccion?: string;

    @ApiProperty({ example: 123456789 })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    telefono?: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    medicacionId?: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animal_veterinarioId?: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}