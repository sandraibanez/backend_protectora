import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngresosDto {

    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ example: 'Donacion' })
    @IsString()
    tipo: string;

    @ApiProperty({ example: '2025-05-20' })
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    cantidad: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    protectoraId?: number[];
}
export class UpdateIngresos{

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Donacion' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    tipo?: string;

    @ApiProperty({ example: 10 })
    @IsInt()
    @IsOptional()
    @Length(1, 50)
    cantidad?: number;

    @ApiProperty({ example: '2025-11-05' })
    @IsOptional()
    @IsDateString()
    fecha?: Date;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(1)
    protectoraId?: number;
}