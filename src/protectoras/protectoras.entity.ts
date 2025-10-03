import { Animales } from 'src/animales/animales.entity';
import { Clinica_veterinaria } from 'src/clinica_veterinaria/clinica_veterinaria.entity';
import { Colonias } from 'src/colonias/colonias.entity';
import { DonacionesViveres } from 'src/donaciones_viveres/donaciones_viveres.entity';
import { Gastos } from 'src/gastos/gastos.entity';
import { Ingresos } from 'src/ingresos/ingresos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

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

    @ManyToOne(() => Animales, animal => animal.protectora)
    animales: Animales;

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

    @ManyToMany(() => Clinica_veterinaria, clinica => clinica.protectora)
    @JoinTable()
    clinicas: Clinica_veterinaria[];

}