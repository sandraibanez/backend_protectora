import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Entidad } from 'src/entidad/entidad.entity';
@Entity()

export class Animal_Entidad {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Animales, (animales) => animales.id)
    animales: Animales[]; 
    
    @ManyToOne(() => Entidad, (entidad) => entidad.id)
    entidades: Entidad[];

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ length: 100 })
    ubicacion: string;


}