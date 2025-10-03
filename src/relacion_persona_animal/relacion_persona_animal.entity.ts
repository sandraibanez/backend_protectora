import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Animales } from 'src/animales/animales.entity';

export enum TipoRelacion {
  ADOPTA = 'adopta',
  ACOGE = 'acoge',
  APADRINA = 'apadrina'
}
@Entity('Relacion_Persona_Animal')
export class Relacion_Persona_Animal {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: TipoRelacion,
  })
  accion: TipoRelacion;

  @ManyToOne(() => User, persona => persona.id)
  persona: User;

  @ManyToOne(() => Animales, animal => animal.id)
  animal: Animales;
  

  
}
