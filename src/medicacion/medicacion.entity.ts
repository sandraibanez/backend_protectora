import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ConsultaMedicacion } from 'src/consulta_medicacion/consulta_medicacion.entity';

@Entity('medicaciones')
export class Medicacion {
  @ApiProperty({ example: 1, description: 'ID único de la medicación' })
  @PrimaryGeneratedColumn()
  id_medicacion: number;

  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: 'Analgésico y antipirético', description: 'Descripción del medicamento' })
  @Column({ nullable: true })
  descripcion?: string;

  @ApiProperty({ example: 'oral / inyectable', description: 'Vía de administración del medicamento' })
  @Column({ nullable: true })
  via_administracion?: string;

  @ApiProperty({ example: 'receta.png', description: 'Ruta o nombre del archivo de la receta médica' })
  @Column({ nullable: true })
  foto_receta?: string;

  @ApiProperty({
    type: () => [ConsultaMedicacion],
    description: 'Administraciones clínicas donde se ha usado este medicamento',
  })
  @OneToMany(() => ConsultaMedicacion, (consultaMedicacion) => consultaMedicacion.medicacion)
  consultaMedicaciones: ConsultaMedicacion[];
}
