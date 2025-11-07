import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('gastos')
export class Gastos {
    @ApiProperty({ example: 1, description: 'ID del gasto' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '2025-11-01', description: 'Fecha que se a realizado el gasto' })
    @Column({ type: 'date' })
    fecha: Date;

    @ApiProperty({ example: 'Veterinario', description: 'Tipo de gasto' })
    @Column({ length: 100 })
    tipo: string;

    @ApiProperty({ example: 1, description: 'Cuanto dinero a costado ese gasto' })
    @Column()
    cantidad: number;
    
    @ApiProperty({ example: 'Calle 568', description: 'Direccion donde se a realizado el gasto' })
    @Column({ length: 100 })
    lugar: string

    @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con protectoras' })
    @ManyToOne (() => Protectoras, protectora => protectora.id)
        protectora: Protectoras;
}