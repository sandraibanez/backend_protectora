import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
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

  
}