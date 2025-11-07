import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('colonias') 
export class Colonias {
    @ApiProperty({ example: 1, description: 'ID de colonias' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Calle 789', description: 'Direccion de la colonia' })
    @Column({ length: 100 })
    localizacion: string;

    @ApiProperty({ example: 1, description: 'Cantidad de gatos de una colonia en concreto' })
    @Column()
    conteo_gatos: number;

    @ApiProperty({ example: '2025-05-16', description: 'Fecha que se ha llevado comida a la colonia' })
    @Column({ type: 'date' })
    horario_alimento: Date;

    @ApiProperty({ example: 1, description: 'Cantidad de comida que se ha llevado a la colonia' })
    @Column()
    cantidad_comida: number;

    @ApiProperty({ example: 'gato.png', description: 'Foto del estado de la colonia' })
    @Column({ length: 100 })
    foto: string;

    @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con protectora' })
    @ManyToOne (() => Protectoras, protectora => protectora.id)
    protectora: Protectoras;

}