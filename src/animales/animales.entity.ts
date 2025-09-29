import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('animales') 
export class Animales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  raza: string;

  @Column({ length: 10 })
  sexo: string;

  @Column({ length: 100 })
  especie: string;

  @Column({ type: 'date' })
  f_nacimiento: Date;

  @Column({ length: 50 })
  estado: string; 

  @Column({ length: 50 })
  chip: string; 

  @Column({ default: false })
  esterilizado: boolean;
}
