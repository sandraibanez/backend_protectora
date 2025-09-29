import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Animal } from './animal.entity';
@Entity()
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

  @OneToMany(type => Animal, (dar) => dar.id)
  dar: Animal[];
  @OneToMany(type => Animal, (acoger) => acoger.id)
  acoger: Animal[];
  @OneToMany(type => Animal, (adoptar) => adoptar.id)
  adoptar: Animal[];
  @ManyToMany(type => Animal, (apadrinar) => apadrinar.id)
  apadrinar: Animal[];
}