import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Medicacion } from 'src/medicacion/medicacion.entity';

@Entity()

export class Clinica_veterinaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @ManyToMany(()=> Medicacion)
  @JoinTable()
    receta: Medicacion[]
}