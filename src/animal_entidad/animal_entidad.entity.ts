import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animal_entidad')
export class Animal_Entidad {
    @ApiProperty({ example: 1, description: 'ID del registro de relación animal-entidad' })
    @PrimaryGeneratedColumn()
    id_animal_entidad: number;

    @ApiProperty({ example: '2025-04-18', description: 'Fecha de registro del animal en la entidad' })
    @Column({ type: 'date' })
    fecha: Date;

    @ApiProperty({ example: 'Calle', description: 'Ubicación del animal dentro de la entidad' })
    @Column()
    ubicacion: string;

    @ApiProperty({ type: () => Animal, description: 'El animal relacionado con esta entidad' })
    @ManyToOne(() => Animal, (animal) => animal.id_animal, { eager: true })
    @JoinColumn({ name: 'animal' })
    animal: Animal;

    @ApiProperty({ type: () => Entidad, description: 'La entidad relacionada con este animal' })
    @ManyToOne(() => Entidad, (entidad) => entidad.id, { eager: true })
    @JoinColumn({ name: 'entidad' })
    entidad: Entidad;
}
