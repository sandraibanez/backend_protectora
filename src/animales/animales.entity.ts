import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Relacion_Persona_Animal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { Animal_Veterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Protectoras } from 'src/protectoras/protectoras.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animales') 
export class Animales {
  @ApiProperty({ example: 1, description: 'ID del animal' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nala', description: 'Nombre del animal' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: 'Golden Retriever', description: 'Raza del perro' })
  @Column({ length: 100 })
  raza: string;

  @ApiProperty({ example: 'Hembra', description: 'Sexo del animal' })
  @Column({ length: 10 })
  sexo: string;

  @ApiProperty({ example: 'Nala.png', description: 'Foto del animal' })
  @Column({ length: 10 })
  foto: string;

  @ApiProperty({ example: 'Perro', description: 'De que especie es el animal' })
  @Column({ length: 100 })
  especie: string;

  @ApiProperty({ example: '2025-04-18', description: 'Fecha de nacimiento del animal' })
  @Column({ type: 'date' })
  f_nacimiento: Date;

  @ApiProperty({ example: 'Sana', description: 'Estado de salud del animal' })
  @Column({ length: 50 })
  estado: string;

  @ApiProperty({ example: 'NalaPerro', description: 'Chip del animal' })
  @Column({ length: 50 })
  chip: string;

  @ApiProperty({ example: true, description: 'Si el animal esta esterelizado' })
  @Column({ default: false })
  esterilizado: boolean;

  @ApiProperty({ type: () => [Medicacion], description: 'Relaciones con medicacion' })
  @OneToMany(() => Medicacion, (medicacion) => medicacion.id)
  medicacion: Medicacion;

  @ApiProperty({ type: () => [Relacion_Persona_Animal], description: 'Relaciones con persona y animal' })
  @OneToMany(() => Relacion_Persona_Animal, rel => rel.animal)
  relaciones: Relacion_Persona_Animal[];

  @ApiProperty({ type: () => [Protectoras], description: 'Relaciones con protectoras' })
  @ManyToOne(() => Protectoras, (pertenece) => pertenece.id)
  pertenece: Protectoras[];

  @ApiProperty({ type: () => [User], description: 'Relaciones con usuario' })
  @ManyToMany(() => User, user=> user.id)
  @JoinTable()
  personas: User[];

  @ApiProperty({ type: () => [Animal_Entidad], description: 'Relaciones con animal y entidad' })
  @OneToMany(() => Animal_Entidad, animal_entidad => animal_entidad.animales)
  animal_entidad: Animal_Entidad[];

  @ApiProperty({ type: () => [Animal_Veterinario], description: 'Relaciones con animal y veterinario' })
  @OneToMany(() => Animal_Veterinario, animal_veterinario => animal_veterinario.animales)
  animal_veterinario: Animal_Veterinario[];
    
}
