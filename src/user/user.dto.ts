import { IsEnum, IsString, IsOptional, IsEmail, IsInt, Length, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RolUsuario } from './user.entity';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'Miriam', description: 'Nombre del usuario' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'claveSegura123', description: 'Contraseña del usuario' })
  @IsString()
  contrasenya: string;

  @ApiProperty({ example: 'Calle Falsa 123', description: 'Dirección del usuario' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: 'miriam@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 600123456, description: 'Número de teléfono del usuario' })
  @Type(() => Number)
  @IsInt()
  telefono: number;

  @ApiProperty({ example: '12345678A', description: 'DNI del usuario' })
  @IsString()
  @Length(9, 9)
  DNI: string;

  @ApiProperty({ enum: RolUsuario, example: RolUsuario.CLIENTE, description: 'Rol del usuario' })
  @IsEnum(RolUsuario)
  rol: RolUsuario;

  @ApiProperty({ example: 3, description: 'ID de la protectora a la que pertenece el usuario' })
  @Type(() => Number)
  @IsInt()
  protectora: number;

  

}

export class AdminUpdateUserDto {
  @ApiPropertyOptional({ example: 'Miriam', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Calle Nueva 456', description: 'Dirección del usuario' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: 'nuevoemail@example.com', description: 'Correo electrónico del usuario' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 600987654, description: 'Número de teléfono del usuario' })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => {
    // Si viene vacío desde Swagger
    if (value === '' || value === null || value === undefined) return undefined;

    // Si Swagger lo convierte a 0
    if (value === 0 || value === '0') return undefined;

    // Si tiene valor real
    return Number(value);
  })
  @IsInt()
  telefono?: number;

  @ApiPropertyOptional({ example: '87654321B', description: 'DNI del usuario' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  @Length(9, 9)
  DNI?: string;

  @ApiPropertyOptional({ enum: RolUsuario, example: RolUsuario.ADMIN, description: 'Rol del usuario' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEnum(RolUsuario)
  rol?: RolUsuario;

  @ApiPropertyOptional({ example: 'NuevaContraseña123', description: 'Nueva contraseña del usuario' }) 
  @IsOptional() 
  @IsString() 
  newPassword?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Miriam', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'miriam@example.com', description: 'Correo electrónico del usuario' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Calle Falsa 123', description: 'Dirección del usuario' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: '12345678A', description: 'DNI del usuario' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  DNI?: string;

  @ApiPropertyOptional({ example: 600123456, description: 'Número de teléfono del usuario' })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => {
    // Si viene vacío desde Swagger
    if (value === '' || value === null || value === undefined) return undefined;

    // Si Swagger lo convierte a 0 
    if (value === 0 || value === '0') return undefined;

    // Si tiene valor real
    return Number(value);
  })
  @IsInt()
  telefono?: number;
}

export class UpdatePasswordDto {
  @ApiProperty({ example: 'miContraseñaActual123', description: 'Contraseña actual del usuario' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'miNuevaContraseña456', description: 'Nueva contraseña del usuario' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
