import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';
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


  @ManyToMany(() => User)
  @JoinTable()
  personas: User[]

  @OneToMany(()=>Medicacion, (medicacion)=> medicacion.id)
    medicacion: Medicacion
}
