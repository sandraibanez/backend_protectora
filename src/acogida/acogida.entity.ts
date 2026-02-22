import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

export enum EstadoAcogida {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
  FINALIZADA = 'finalizada',
}

@Entity('acogidas')
export class Acogida {
  @PrimaryGeneratedColumn()
  id_acogida: number;

  @ApiProperty({ example: '2025-04-18T14:30:00Z' })
  @Column({ type: 'timestamp' })
  fecha_solicitud: Date;

  @ApiProperty({ enum: EstadoAcogida })
  @Column({
    type: 'enum',
    enum: EstadoAcogida,
    default: EstadoAcogida.PENDIENTE,
  })
  estado: EstadoAcogida;

  @ApiProperty({ example: 'Tiene experiencia con gatos' })
  @Column({ nullable: true })
  observaciones: string;

  @ManyToOne(() => Animal, animal => animal.acogidas)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => User, user => user.acogidas)
  @JoinColumn({ name: 'id_user' })
  usuario: User;
}
