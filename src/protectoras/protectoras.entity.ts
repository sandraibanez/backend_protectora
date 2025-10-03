import { Colonias } from 'src/colonias/colonias.entity';
import { DonacionesViveres } from 'src/donaciones_viveres/donaciones_viveres.entity';
import { Gastos } from 'src/gastos/gastos.entity';
import { Ingresos } from 'src/ingresos/ingresos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
@Entity('protectoras') 
export class Protectoras {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 100 })
    direccion: string;  

    @Column({ length: 15 })
    telefono: string;

    @OneToMany(() => Colonias, colonia => colonia.protectora)
    colonias: Colonias[];

    @OneToMany(() => DonacionesViveres, donacion => donacion.protectora)    
    donaciones_viveres: DonacionesViveres[];

    @OneToMany(() => Gastos, gasto => gasto.protectora)
    gastos: Gastos[];

    @OneToMany(() => Ingresos, ingreso => ingreso.protectora)
    ingresos: Ingresos[];

    @OneToMany(() => Animales, Animal => Animal.id)
    animal: Animales[];

}