import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Protectora } from '../protectora/protectora.entity';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ingresos')
export class Ingreso {
  @ApiProperty({ example: 1, description: 'ID único del ingreso' })
  @PrimaryGeneratedColumn()
  id_ingreso: number;

  @ApiProperty({ example: '2025-06-10', description: 'Fecha en la que se recibió el ingreso' })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({ example: 'Donación', description: 'Tipo de ingreso recibido (por ejemplo: donación, subvención, evento...)' })
  @Column({ length: 100 })
  tipo: string;

  @ApiProperty({ example: 500, description: 'Cantidad económica del ingreso en euros' })
  @Column()
  cantidad: number;

  @ApiProperty({ type: () => User, description: 'Usuario que realizó la donación (opcional)' })
  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_user' })
  usuario?: User;

  @ApiProperty({ type: () => Protectora, description: 'Protectora asociada a este ingreso' })
  @ManyToOne(() => Protectora, (protectora) => protectora.id_protectora, { eager: true })
  @JoinColumn({ name: 'protectora' })
  protectora: Protectora;
}
