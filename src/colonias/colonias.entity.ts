import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Protectoras } from '../protectoras/protectoras.entity';

@Entity('colonias') 
export class Colonias {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100 })
    localizacion: string;

    @Column()
    conteo_gatos: number;

    @Column({ type: 'date' })
    horario_alimento: Date;

    @Column()
    cantidad_comida: number;

    @Column({ length: 100 })
    foto: string;

    @ManyToOne (() => Protectoras, protectora => protectora.id)
    protectora: Protectoras;

}