import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animalVeterinario')
export class AnimalVeterinario {

    @ApiProperty({ example: 1, description: 'ID del registro de relación entre animal y veterinario' })
    @PrimaryGeneratedColumn()
    id_animalVeterinario: number;

    @ApiProperty({ example: '2025-04-05', description: 'Fecha de atención del animal por el veterinario' })
    @Column({ type: 'date' })
    fecha: Date;

    @ApiProperty({ example: 'Sano', description: 'Diagnóstico realizado al animal' })
    @Column()
    diagnostico: string;

    // @ApiProperty({ type: () => Animal, description: 'Animal relacionado con el registro' })
    @OneToOne(() => Animal, (animal) => animal.id_animal, { eager: true })
    @JoinColumn({ name: 'animal' })
    animal: Animal;

    @ApiProperty({ type: () => Veterinario, description: 'Veterinario que atiende al animal' })
    @ManyToOne(() => Veterinario, (veterinario) => veterinario.id_veterinario, { eager: true })
    @JoinColumn({ name: 'veterinario' })
    veterinario: Veterinario;
}
