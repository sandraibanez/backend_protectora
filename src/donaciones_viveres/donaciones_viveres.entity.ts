import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Protectora } from '../protectora/protectora.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('donaciones_viveres')
export class DonacionesViveres {
    @ApiProperty({ example: 1, description: 'ID de la donación' })
    @PrimaryGeneratedColumn()
    id_donacion: number;

    @ApiProperty({ example: '2025-06-01', description: 'Fecha de la donación' })
    @Column({ type: 'date' }) 
    fecha: Date;  
  
    @ApiProperty({ example: 'Alimento', description: 'Tipo de víveres donados' })
    @Column()
    tipo: string;

    @ApiProperty({ example: 50, description: 'Cantidad de víveres donados' })
    @Column()
    cantidad: number;

    @ApiProperty({ example: 'Calle Mayor 123', description: 'Lugar de la donación' })
    @Column()
    lugar: string;

    @ApiProperty({ type: () => Protectora, description: 'Protectora asociada a la donación' })
    @ManyToOne(() => Protectora, (protectora) => protectora.id_protectora, { eager: true })
    @JoinColumn({ name: 'protectora' })
    protectora: Protectora;
}
