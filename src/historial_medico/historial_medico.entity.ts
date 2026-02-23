import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

@Entity('historial_medico')
export class HistorialMedico {
  @ApiProperty({ example: 1, description: 'ID único del registro médico' })
  @PrimaryGeneratedColumn()
  id_registro: number;

  @ApiProperty({ example: '2025-04-05', description: 'Fecha de la consulta veterinaria' })
  @Column({ type: 'date' })
  fecha: Date;

  @ApiProperty({ example: 'Revisión anual', description: 'Motivo de la consulta' })
  @Column({ nullable: true })
  motivo_consulta?: string;

  @ApiProperty({ example: 'Sano, sin anomalías', description: 'Diagnóstico realizado por el veterinario' })
  @Column({ type: 'text' })
  diagnostico: string;

  @ApiProperty({ example: 'Continuar con alimentación balanceada', description: 'Tratamiento o recomendaciones' })
  @Column({ type: 'text', nullable: true })
  tratamiento?: string;

  @ApiProperty({ example: 'Paracetamol 500mg cada 12h durante 5 días, Antibiótico X 1 comprimido al día', description: 'Medicamentos prescritos con dosis y duración' })
  @Column({ type: 'text', nullable: true })
  medicamentos?: string;

  @ApiProperty({ example: true, description: 'Indica si el animal está actualmente en tratamiento médico' })
  @Column({ type: 'boolean', default: false })
  en_tratamiento: boolean;

  @ApiProperty({ example: 'Animal muy cooperativo durante el examen', description: 'Observaciones adicionales del veterinario' })
  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ApiProperty({ type: () => Animal, description: 'Animal al que corresponde este registro médico' })
  @ManyToOne(() => Animal, (animal) => animal.historialMedico)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ApiProperty({ type: () => User, description: 'Veterinario que realizó la consulta' })
  @ManyToOne(() => User, (user) => user.historialesMedicos)
  @JoinColumn({ name: 'id_veterinario' })
  veterinario: User;
}
