import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Clinica_veterinaria } from 'src/clinica_veterinaria/clinica_veterinaria.entity';

@Entity('animal_veterinario')
export class Animal_Veterinario {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Animales, animal => animal.id)
    animales: Animales[];

    @ManyToOne(() => Clinica_veterinaria, clinica => clinica.id)
    clinicas: Clinica_veterinaria[];

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ length: 100 })
    diagnostico: string;

}