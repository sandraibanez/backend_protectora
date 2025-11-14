import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Animal } from 'src/animal/animal.entity';

export enum TipoRelacion {
  ADOPTA = 'adopta',
  ACOGE = 'acoge',
  APADRINA = 'apadrina',
}

@Entity('relacion_persona_animal')
export class RelacionPersonaAnimal {
  @ApiProperty({
    example: 1,
    description: 'ID único de la relación persona-animal',
  })
  @PrimaryGeneratedColumn()
  id_relacion: number;

  @ApiProperty({
    example: '2025-04-15',
    description: 'Fecha en la que se establece la relación entre la persona y el animal',
  })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({
    enum: TipoRelacion,
    example: TipoRelacion.ADOPTA,
    description: 'Tipo de relación entre la persona y el animal',
  })
  @Column({
    type: 'enum',
    enum: TipoRelacion,
  })
  accion: TipoRelacion;

  @ApiProperty({
    type: () => User,
    description: 'Persona (usuario) asociada a esta relación',
  })
  @ManyToOne(() => User, (persona) => persona.id_user)
  @JoinColumn()
  persona: User;

  @ApiProperty({
    type: () => Animal,
    description: 'Animal asociado a esta relación',
  })
  @ManyToOne(() => Animal, (animal) => animal.id_animal)
  @JoinColumn()
  animal: Animal;
}
