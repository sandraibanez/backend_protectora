import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { Animal_Veterinario } from 'src/animal_veterinario/animal_veterinario.entity';
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


  @ManyToMany(() => User)
  @JoinTable()
  personas: User[]

  @OneToMany(()=>Medicacion, (medicacion)=> medicacion.id)
    medicacion: Medicacion

  @OneToMany(() => Animal_Entidad, animal_entidad => animal_entidad.animales)
  animal_entidad: Animal_Entidad[];

  @OneToMany(() => Animal_Veterinario, animal_veterinario => animal_veterinario.animales)
  animal_veterinario: Animal_Veterinario[];

  @ManyToOne(() => Protectoras, protectora => protectora.id)
  protectora: Protectoras;
    
}
