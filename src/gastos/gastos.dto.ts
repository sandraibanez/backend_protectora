import { IsString, IsDateString, IsBoolean, IsOptional, IsNumber, IsArray, IsInt, Length, Min, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGastosDto {
    @ApiProperty({ example: 'Veterinario' })
    @IsString()
    tipo: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    conteo_gatos: number;

    @ApiProperty({ example: 'Calle 568' })
    @IsString()
    lugar: string;

    @ApiProperty({ example: '2025-11-01'})
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
export class UpdateGastos{

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ example: 'Veterinario' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    tipo?: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Length(1, 50)
    cantidad?: number;

    @ApiProperty({ example: 'Calle Secundaria' })
    @IsString()
    @IsOptional()
    @Length(1, 50)
    lugar?: string;

    @ApiProperty({ example: '2025-11-01' })
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