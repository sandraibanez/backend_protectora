import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Relacion_Persona_Animal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')

export class User {
  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Carlos', description: 'Nombre del usuario' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'abc123', description: 'Contrasena del usuario' })
  @Column()
  contrasenya: string;

  @ApiProperty({ example: 'Calle 123', description: 'Direccion del usuario' })
  @Column()
  direccion: string;

  @ApiProperty({ example: 'carlos@mail.com', description: 'Correo del usuario' })
  @Column()
  email: string;

  @ApiProperty({ example: 600123456, description: 'Telefono del usuario' })
  @Column()
  telefono: number;

  @ApiProperty({ example: 12345678, description: 'DNI del usuario' })
  @Column()
  DNI: number;

  @ApiProperty({ type: () => [Relacion_Persona_Animal], description: 'Relaciones con animales' })
  @OneToMany(() => Relacion_Persona_Animal, rel => rel.persona)
  relaciones: Relacion_Persona_Animal[];

}