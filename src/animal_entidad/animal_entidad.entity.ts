import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animal_entidad')

export class Animal_Entidad {
    @ApiProperty({ example: 1, description: 'ID de Animal Entidad' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => [Animales], description: 'Relaciones con animales' })
    @OneToMany(() => Animales, (animales) => animales.id)
    animales: Animales; 

    @ApiProperty({ type: () => [Entidad], description: 'Relaciones con entidad' })
    @ManyToOne(() => Entidad, (entidad) => entidad.id)
    entidades: Entidad;

    @ApiProperty({ example: '2025-11-30', description: 'Fecha de incorparacion a la tabla Animla_Entidad' })
    @Column({ type: 'date' })
    fecha: Date;

    @ApiProperty({ example: 'Calle 568', description: 'Direccion donde la entidad a encontrado al animal' })
    @Column({ length: 100 })
    ubicacion: string;

    
}