import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Relacion_Persona_Animal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
import { Protectoras } from 'src/protectoras/protectoras.entity';
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

  @OneToMany(() => Medicacion, (medicacion) => medicacion.id)
  medicacion: Medicacion

  @OneToMany(() => Relacion_Persona_Animal, rel => rel.animal)
  relaciones: Relacion_Persona_Animal[];

  @ManyToOne(() => Protectoras, (pertenece) => pertenece.id)
  pertenece: Protectoras[];
}
