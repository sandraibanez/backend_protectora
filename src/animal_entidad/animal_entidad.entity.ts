import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Entidad } from 'src/entidad/entidad.entity';
@Entity('animal_entidad')

export class Animal_Entidad {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Animales, (animales) => animales.animal_entidad)
    animales: Animales; 
    
    @ManyToOne(() => Entidad, (entidad) => entidad.animal_entidad)
    entidades: Entidad;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ length: 100 })
    ubicacion: string;


}