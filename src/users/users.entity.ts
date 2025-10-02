import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
@Entity()
export class Users {
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

  @OneToMany(type => Animales, (dar) => dar.id)
  dar: Animales[];
  @OneToMany(type => Animales, (acoger) => acoger.id)
  acoger: Animales[];
  @OneToMany(type => Animales, (adoptar) => adoptar.id)
  adoptar: Animales[];
  @ManyToMany(type => Animales, (apadrinar) => apadrinar.id)
  apadrinar: Animales[];
}