import { IsEnum, IsString, IsOptional, IsEmail, IsInt, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RolUsuario } from './user.entity';

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
  @IsInt()
  telefono: number;

  @ApiProperty({ example: '12345678A', description: 'DNI del usuario' })
  @IsString()
  @Length(9, 9)
  DNI: string;

  @ApiProperty({ enum: RolUsuario, example: RolUsuario.CLIENTE, description: 'Rol del usuario' })
  @IsEnum(RolUsuario)
  rol: RolUsuario;
  
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 1, description: 'ID del usuario' })
  @IsOptional()
  @IsInt()
  id_user?: number;

  @ApiPropertyOptional({ example: 'Miriam', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'claveNueva456', description: 'Contraseña del usuario' })
  @IsOptional()
  @IsString()
  contrasenya?: string;

  @ApiPropertyOptional({ example: 'Calle Nueva 456', description: 'Dirección del usuario' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: 'nuevoemail@example.com', description: 'Correo electrónico del usuario' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 600987654, description: 'Número de teléfono del usuario' })
  @IsOptional()
  @IsInt()
  telefono?: number;

  @ApiPropertyOptional({ example: '87654321B', description: 'DNI del usuario' })
  @IsOptional()
  @IsString()
  @Length(9, 9)
  DNI?: string;

  @ApiPropertyOptional({ enum: RolUsuario, example: RolUsuario.ADMIN, description: 'Rol del usuario' })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;
}
