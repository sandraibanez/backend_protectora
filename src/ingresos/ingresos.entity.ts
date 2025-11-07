import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ingresos')
export class Ingresos {

    @ApiProperty({ example: 1, description: 'ID del ingreso' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '2025-05-20', description: 'Fecha del ingreso' })
    @Column({ type: 'date' }) 
    fecha: Date;
    
    @ApiProperty({ example: 'Donacion', description: 'Tipo de ingreso' })
    @Column({ length: 100 })
    tipo: string;

    @ApiProperty({ example: 1, description: 'Cantidad de dinero que han ingresado' })
    @Column()
    cantidad: number;

    @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con protectoras' })
    @ManyToOne (() => Protectoras, protectora => protectora.id)
        protectora: Protectoras;
}

