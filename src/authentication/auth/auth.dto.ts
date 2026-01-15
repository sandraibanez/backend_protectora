import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'miriam@example.com',
    description: 'Correo electrónico del usuario'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'Contraseña del usuario'
  })
  @IsString()
  password: string;
}
