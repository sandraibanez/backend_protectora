import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('donaciones_viveres')
export class DonacionesViveres {

    @ApiProperty({ example: 1, description: 'ID de donaciones viveres' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '2025-11-05', description: 'Fecha de donacion de viveres' })
    @Column({ type: 'date' }) 
    fecha: Date;  
  
    @ApiProperty({ example: 'Comida', description: 'Tipo de donacion de viveres' })
    @Column({ length: 100 })
    tipo: string;

    @ApiProperty({ example: 1, description: 'Cantidad de donacion de viveres' })
    @Column()
    cantidad: number;

    @ApiProperty({ example: 'Calle Costera', description: 'Direccion del lugar donde se ha donado los viveres' })
    @Column({ length: 100 })
    lugar: string;

    @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con protectora' })
    @ManyToOne (() => Protectoras, protectora => protectora.id)
        protectora: Protectoras;
}