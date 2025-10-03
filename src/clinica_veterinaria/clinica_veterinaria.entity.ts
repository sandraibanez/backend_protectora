import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Animal_Veterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Protectoras } from 'src/protectoras/protectoras.entity';

@Entity('clinica_veterinaria')

export class Clinica_veterinaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @ManyToMany(() => Medicacion, medicacion => medicacion.id)
  @JoinTable()
  receta: Medicacion[]

  @ManyToOne(() => Animal_Veterinario, animal_veterinario => animal_veterinario.clinicas)
  animal_veterinario: Animal_Veterinario;

  @ManyToMany(() => Protectoras, protectora => protectora.id)
  protectora: Protectoras;
}