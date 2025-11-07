import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEntidadDto {
    @ApiProperty({ example: 'Nerea' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Civil' })
    @IsString()
    tipo: string;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    animal_entidadId?: number[];
}
export class UpdateEntidad{
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Claudia' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    nombre?: string;

    @ApiProperty({ example: 'Civil' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    tipo?: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    animal_entidadId?: number;
}