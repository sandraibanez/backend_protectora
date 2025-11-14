import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('medicaciones')
export class Medicacion {
  @ApiProperty({ example: 1, description: 'ID único de la medicación' })
  @PrimaryGeneratedColumn()
  id_medicacion: number;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento médico del animal' })
  @Column({ type: 'date' })
  f_inicio: Date;

  @ApiProperty({ example: '2025-11-30', description: 'Fecha de finalización del tratamiento médico' })
  @Column({ type: 'date' })
  f_fin: Date;

  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento administrado' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: '1mg cada 8 horas', description: 'Dosis y frecuencia de administración del medicamento' })
  @Column({ length: 50 })
  dosis: string;

  @ApiProperty({ example: 'receta.png', description: 'Ruta o nombre del archivo de la receta médica (opcional)' })
  @Column({ nullable: true })
  foto_receta: string;

  @ApiProperty({
    type: () => [Animal],
    description: 'Lista de animales que están recibiendo esta medicación',
  })
  @ManyToMany(() => Animal, (animal) => animal.medicaciones)
  animales: Animal[];
}
