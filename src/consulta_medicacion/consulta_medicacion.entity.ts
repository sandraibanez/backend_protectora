import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Medicacion } from '../medicacion/medicacion.entity';

@Entity('consulta_medicacion')
export class ConsultaMedicacion {
  
  @ApiProperty({ example: 1, description: 'ID del registro de administración de medicación' })
  @PrimaryGeneratedColumn()
  id_consulta_medicacion: number;

  @ApiProperty({ example: '1 comprimido cada 12 horas', description: 'Dosis administrada al animal' })
  @Column()
  dosis: string;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento' })
  @Column({ type: 'date' })
  f_inicio: Date;

  @ApiProperty({ example: '2025-11-10', description: 'Fecha de finalización del tratamiento' })
  @Column({ type: 'date' })
  f_fin: Date;

  @ApiProperty({ example: 'Administrar con comida', description: 'Notas adicionales del veterinario' })
  @Column({ nullable: true })
  notas?: string;

  @ApiProperty({ type: () => AnimalVeterinario, description: 'Consulta en la que se administró la medicación' })
  @ManyToOne(() => AnimalVeterinario, (consulta) => consulta.consultaMedicaciones, { eager: true })
  @JoinColumn({ name: 'consulta' })
  consulta: AnimalVeterinario;

  @ApiProperty({ type: () => Medicacion, description: 'Medicamento administrado' })
  @ManyToOne(() => Medicacion, (medicacion) => medicacion.id_medicacion, { eager: true })
  @JoinColumn({ name: 'medicacion' })
  medicacion: Medicacion;
}
