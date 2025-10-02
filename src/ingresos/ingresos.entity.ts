import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';

@Entity('ingresos')
export class Ingresos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' }) 
    fecha: Date;
    
    @Column({ length: 100 })
    tipo: string;

    @Column()
    cantidad: number;

    @ManyToOne (() => Protectoras, protectora => protectora.id)
        protectora: Protectoras;
}

