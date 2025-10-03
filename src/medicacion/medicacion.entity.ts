import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { DateDataType } from 'sequelize';
@Entity('medicacion')

export class Medicacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  f_inicio: Date;

  @Column({ type: 'date' })
  f_fin: Date;

  @Column()
  nombre: string;

  @Column()
  dosis: string;

  @Column()
  foto_receta: string;


  @ManyToOne(() => Animales, (animales) => animales.id)
  animales: Animales


}