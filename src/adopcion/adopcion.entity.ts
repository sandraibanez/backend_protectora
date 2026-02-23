import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

export enum EstadoAdopcion {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
  COMPLETADA = 'completada',
}

@Entity('adopciones')
export class Adopcion {
  @ApiProperty({ example: 1, description: 'ID único de la adopción' })
  @PrimaryGeneratedColumn()
  id_adopcion: number;

  @ApiProperty({
    example: '2025-04-18T14:30:00Z',
    description: 'Fecha y hora en la que se solicita la adopción'
  })
  @Column({ type: 'timestamp' })
  fecha_solicitud: Date;

  @ApiProperty({
    example: '2025-04-20T10:00:00Z',
    description: 'Fecha en la que se aprobó o rechazó la adopción',
    required: false
  })
  @Column({ type: 'timestamp', nullable: true })
  fecha_respuesta?: Date;

  @ApiProperty({
    example: '2025-04-25T12:00:00Z',
    description: 'Fecha en la que se completó la adopción (el adoptante se lleva al animal)',
    required: false
  })
  @Column({ type: 'timestamp', nullable: true })
  fecha_adopcion?: Date;

  @ApiProperty({
    enum: EstadoAdopcion,
    example: EstadoAdopcion.PENDIENTE,
    description: 'Estado actual de la solicitud de adopción'
  })
  @Column({
    type: 'enum',
    enum: EstadoAdopcion,
    default: EstadoAdopcion.PENDIENTE,
  })
  estado: EstadoAdopcion;

  @ApiProperty({
    example: 'Tengo experiencia con perros grandes y jardín amplio',
    description: 'Observaciones del solicitante',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ApiProperty({
    example: 'Familia responsable con buen historial',
    description: 'Notas del trabajador sobre la adopción',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  notas_trabajador?: string;

  @ApiProperty({ type: () => Animal, description: 'Animal que se quiere adoptar' })
  @ManyToOne(() => Animal, { eager: true })
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ApiProperty({ type: () => User, description: 'Usuario que solicita adoptar al animal' })
  @ManyToOne(() => User, (user) => user.adopciones)
  @JoinColumn({ name: 'id_adoptante' })
  adoptante: User;
}
