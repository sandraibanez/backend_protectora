import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsInt } from 'class-validator';

export class CreateAnimalVeterinarioDto {

    @ApiProperty({ example: '2025-04-05', description: 'Fecha de atención del animal por el veterinario' })
    @IsDateString()
    fecha: Date;

    @ApiProperty({ example: 'Sano', description: 'Diagnóstico realizado al animal' })
    @IsString()
    diagnostico: string;

    @ApiProperty({ example: 1, description: 'ID del animal relacionado' })
    @IsInt()
    animal: number;

    @ApiProperty({ example: 1, description: 'ID del veterinario que atiende al animal' })
    @IsInt()
    veterinario: number;
}

export class UpdateAnimalVeterinarioDto {

    @ApiProperty({ example: 1, description: 'ID del registro de relación animal-veterinario' })
    @IsOptional()
    @IsInt()
    id_animalVeterinario?: number;

    @ApiProperty({ example: 1, description: 'ID del animal relacionado' })
    @IsOptional()
    @IsInt()
    animal?: number;

    @ApiProperty({ example: 1, description: 'ID del veterinario que atiende al animal' })
    @IsOptional()
    @IsInt()
    veterinario?: number;

    @ApiProperty({ example: '2025-04-05', description: 'Fecha de atención del animal por el veterinario' })
    @IsOptional()
    @IsDateString()
    fecha?: Date;

    @ApiProperty({ example: 'Enfermo', description: 'Diagnóstico realizado al animal' })
    @IsOptional()
    @IsString()
    diagnostico?: string;
}
