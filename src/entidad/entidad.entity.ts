import { Entity, Column, PrimaryGeneratedColumn,ManyToMany , JoinTable, OneToMany } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';

@Entity()

export class Entidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @OneToMany(()=> Animal_Entidad, animal_entidad => animal_entidad.entidades)
  animal_entidad: Animal_Entidad[];
}