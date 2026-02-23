import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoticiaDto {
  @ApiProperty({
    example: 'Nuevo refugio para gatos',
    description: 'Título de la noticia',
  })
  @IsString()
  @MaxLength(255)
  titulo: string;

  @ApiProperty({
    example: 'Hemos inaugurado un nuevo refugio para gatos abandonados...',
    description: 'Contenido completo de la noticia',
  })
  @IsString()
  contenido: string;

  @ApiPropertyOptional({
    example: 'https://example.com/imagen.jpg',
    description: 'URL de la imagen de la noticia',
  })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si la noticia está publicada',
  })
  @IsOptional()
  @IsBoolean()
  publicada?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID de la protectora (se asigna automáticamente para trabajadores)',
  })
  @IsOptional()
  @IsInt()
  id_protectora?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del usuario autor (se asigna automáticamente)',
  })
  @IsOptional()
  @IsInt()
  id_user?: number;
}

export class UpdateNoticiaDto {
  @ApiPropertyOptional({
    example: 'Nuevo refugio para gatos',
    description: 'Título de la noticia',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  titulo?: string;

  @ApiPropertyOptional({
    example: 'Hemos inaugurado un nuevo refugio para gatos abandonados...',
    description: 'Contenido completo de la noticia',
  })
  @IsOptional()
  @IsString()
  contenido?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/imagen.jpg',
    description: 'URL de la imagen de la noticia',
  })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si la noticia está publicada',
  })
  @IsOptional()
  @IsBoolean()
  publicada?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID de la protectora',
  })
  @IsOptional()
  @IsInt()
  id_protectora?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del usuario autor',
  })
  @IsOptional()
  @IsInt()
  id_user?: number;
}
