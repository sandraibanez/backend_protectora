import { Entity, Column, PrimaryGeneratedColumn,ManyToMany , JoinTable } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';

@Entity()

export class Entidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @ManyToMany(()=> Animales)
  @JoinTable()
    receta: Animales[]
}