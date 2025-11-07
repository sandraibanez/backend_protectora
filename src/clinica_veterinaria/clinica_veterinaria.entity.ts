import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Animal_Veterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Protectoras } from 'src/protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clinica_veterinaria')

export class Clinica_veterinaria {

  @ApiProperty({ example: 1, description: 'ID de clinica_veterinaria' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Patitas', description: 'Nombre de la clinica veterinaria' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Calle Principal', description: 'Direccion de la clinica veterinaria' })
  @Column()
  direccion: string;

  @ApiProperty({ example: '123456789', description: 'Numero de telefono de la clinica veterinaria' })
  @Column()
  telefono: string;

  @ApiProperty({ type: () => [Medicacion], description: 'Relaciones con Medicacion' })
  @ManyToMany(() => Medicacion, medicacion => medicacion.id)
  @JoinTable()
  receta: Medicacion[]

  @ApiProperty({ type: () => [Animal_Veterinario], description: 'Relaciones con Animal veterianrio' })
  @ManyToOne(() => Animal_Veterinario, animal_veterinario => animal_veterinario.id)
  animal_veterinario: Animal_Veterinario;

  @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con Protectoras' })
  @ManyToMany(() => Protectoras, protectora => protectora.id)
  protectora: Protectoras;
}