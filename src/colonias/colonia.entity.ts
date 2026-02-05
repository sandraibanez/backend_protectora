import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Protectora } from '../protectora/protectora.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animal/animal.entity';

@Entity('colonias') 
export class Colonia {
    @ApiProperty({ example: 1, description: 'ID de colonias' })
    @PrimaryGeneratedColumn()
    id_colonia: number;

    @ApiProperty({ example: 'Calle 789', description: 'Direccion de la colonia' })
    @Column()
    localizacion: string;

    @ApiProperty({ example: 12, description: 'Cantidad de gatos de una colonia en concreto' })
    @Column()
    conteo_gatos: number;

    @ApiProperty({ example: '2025-05-16', description: 'Fecha que se ha llevado comida a la colonia' })
    @Column({ type: 'date' })
    horario_alimento: Date;

    @ApiProperty({ example: 'gato.png', description: 'Foto del estado de la colonia' })
    @Column({nullable: true })
    foto: string;

    @ApiProperty({ type: () => Protectora, description: 'Relaciones con protectora' })
    @ManyToOne(() => Protectora, (protectora) => protectora.id_protectora)
    protectora: Protectora;

    @OneToMany(() => Animal, (animal) => animal.colonia)
    animales: Animal[];


}