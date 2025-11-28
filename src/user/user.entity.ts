import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RelacionPersonaAnimal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum RolUsuario {
  CLIENTE = 'cliente',
  ADMIN = 'admin',
  VETERINARIO = 'veterinario',
}

@Entity('Users')
export class User {
  @ApiProperty({ example: 1, description: 'ID único del usuario' })
  @PrimaryGeneratedColumn()
  id_user: number;

  @ApiProperty({ example: 'Miriam', description: 'Nombre del usuario' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'claveSegura123', description: 'Contraseña del usuario' })
  @Column()
  contrasenya: string;

  @ApiProperty({ example: 'Calle Falsa 123', description: 'Dirección del usuario' })
  @Column()
  direccion: string;

  @ApiProperty({ example: 'miriam@example.com', description: 'Correo electrónico del usuario' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 600123456, description: 'Número de teléfono del usuario' })
  @Column()
  telefono: number;

  @ApiProperty({ example: '12345678A', description: 'DNI del usuario' })
  @Column()
  DNI: string;

  @ApiProperty({
    enum: RolUsuario,
    example: RolUsuario.CLIENTE,
    description: 'Rol asignado al usuario',
  })
  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol: RolUsuario;

}
