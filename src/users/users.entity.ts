import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Relacion_Persona_Animal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
@Entity('user')

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  email: string;

  @Column()
  telefono: Number;

  @Column()
  DNI: Number;

  @OneToMany(() => Relacion_Persona_Animal, rel => rel.persona)
  relaciones: Relacion_Persona_Animal[];

}