import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Animal {
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

//   @OneToMany(type => animal, (dar) => animal.id)
//   dar: animal[];
}