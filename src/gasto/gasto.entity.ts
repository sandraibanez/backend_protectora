import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Protectora } from '../protectora/protectora.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('gastos')
export class Gasto {
  @ApiProperty({ example: 1, description: 'ID único del gasto' })
  @PrimaryGeneratedColumn()
  id_gasto: number;

  @ApiProperty({ example: '2025-06-10', description: 'Fecha en la que se realizó el gasto' })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({ example: 'Veterinario', description: 'Tipo de gasto realizado (ejemplo: veterinario, comida, material)' })
  @Column({ length: 100 })
  tipo: string;

  @ApiProperty({ example: 150, description: 'Cantidad económica del gasto en euros' })
  @Column()
  cantidad: number;

  @ApiProperty({ type: () => Protectora, description: 'Protectora asociada a este gasto' })
  @ManyToOne(() => Protectora, (protectora) => protectora.id_protectora, { eager: true })
  @JoinColumn()
  protectora: Protectora;
}
