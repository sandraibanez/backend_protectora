import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Animales } from 'src/animales/animales.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoRelacion {
  ADOPTA = 'adopta',
  ACOGE = 'acoge',
  APADRINA = 'apadrina'
}
@Entity('Relacion_Persona_Animal')
export class Relacion_Persona_Animal {
  @ApiProperty({ example: 1, description: 'ID de relacion persona animal' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de la relacion persona animal' })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({ example: 'acoje', description: 'Tipo de relacion' })
  @Column({
    type: 'enum',
    enum: TipoRelacion,
  })
  accion: TipoRelacion;

  @ApiProperty({ type: () => [User], description: 'Relaciones con usuarios' })
  @ManyToOne(() => User, persona => persona.id)
  persona: User;

  @ApiProperty({ type: () => [Animales], description: 'Relaciones con animales' })
  @ManyToOne(() => Animales, animal => animal.id)
  animal: Animales;
  

  
}
