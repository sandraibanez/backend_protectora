import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';

@Entity('donaciones_viveres')
export class DonacionesViveres {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' }) 
    fecha: Date;  
  
    @Column({ length: 100 })
    tipo: string;

    @Column()
    cantidad: number;

    @Column({ length: 100 })
    lugar: string;

    @ManyToOne (() => Protectoras, protectora => protectora.id)
        protectora: Protectoras;
}