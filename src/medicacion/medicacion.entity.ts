import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { DateDataType } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

@Entity('medicacion')

export class Medicacion {
  @ApiProperty({ example: 1, description: 'ID de medicacion' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2025-11-01', description: 'Fecha de inicio del tratamiento ' })
  @Column({ type: 'date' })
  f_inicio: Date;

  @ApiProperty({ example: '2025-11-30', description: 'Fecha de fin del tratamiento' })
  @Column({ type: 'date' })
  f_fin: Date;

  @ApiProperty({ example: 'Paracetamol', description: 'Nombre de la medicacion' })
  @Column()
  nombre: string;

  @ApiProperty({ example: '1mg', description: 'Dosis que hay que dar este medicamento' })
  @Column()
  dosis: string;

  @ApiProperty({ example: 'receta.png', description: 'Foto de la receta de la medicacion' })
  @Column()
  foto_receta: string;

  @ApiProperty({ type: () => [Animales], description: 'Relaciones con animales' })
  @ManyToOne(() => Animales, (animales) => animales.id)
  animales: Animales

}