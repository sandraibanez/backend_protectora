import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Clinica_veterinaria } from 'src/clinica_veterinaria/clinica_veterinaria.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animal_veterinario')
export class Animal_Veterinario {

    @ApiProperty({ example: 1, description: 'ID de animal_veterinario' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => [Animales], description: 'Relaciones con animales' })
    @OneToMany(() => Animales, animal => animal.animal_veterinario)
    animales: Animales;

    @ApiProperty({ type: () => [Clinica_veterinaria], description: 'Relaciones con clinica veterinaria' })
    @ManyToOne(() => Clinica_veterinaria, clinica => clinica.animal_veterinario)
    clinicas: Clinica_veterinaria;

    @ApiProperty({ example: '2025-04-25', description: 'Fecha de la visita del animal' })
    @Column({ type: 'date' })
    fecha: Date;

    @ApiProperty({ example: 'Sano', description: 'Diagnostico de la visita del animal' })
    @Column({ length: 100 })
    diagnostico: string;

}