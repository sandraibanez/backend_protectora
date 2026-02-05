import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ConsultaMedicacion } from 'src/consulta_medicacion/consulta_medicacion.entity';
import { User } from 'src/user/user.entity';

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

    @ApiProperty({ type: () => Animal, description: 'Animal relacionado con el registro' })
    @ManyToOne(() => Animal, (animal) => animal.animalVeterinarios, { eager: true })
    @JoinColumn({ name: 'animal' })
    animal: Animal;

    @ApiProperty({ type: () => User, description: 'Veterinario que atiende al animal' })
    @ManyToOne(() => User, user => user.animalVeterinarios)
    @JoinColumn({ name: 'id_veterinario' })
    veterinario: User;


    @ApiProperty({ type: () => [ConsultaMedicacion], description: 'Medicaciones administradas durante esta consulta veterinaria', })
    @OneToMany(() => ConsultaMedicacion, consultaMedicacion => consultaMedicacion.consulta) 
    consultaMedicaciones: ConsultaMedicacion[];
}
