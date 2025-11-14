import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne ,ManyToOne } from 'typeorm';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { RelacionPersonaAnimal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Protectora } from 'src/protectora/protectora.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('animales') 
export class Animal {
  @ApiProperty({ example: 1, description: 'ID del animal' })
  @PrimaryGeneratedColumn()
  id_animal: number;

  @ApiProperty({ example: 'Nala', description: 'Nombre del animal' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Golden Retriever', description: 'Raza del perro' })
  @Column()
  raza: string;

  @ApiProperty({ example: 'Nala.png', description: 'Foto del animal' })
  @Column()
  foto: string;
  
  @ApiProperty({ example: 'Hembra', description: 'Sexo del animal' })
  @Column()
  sexo: string;

  @ApiProperty({ example: 'Perro', description: 'De que especie es el animal' })
  @Column()
  especie: string;

  @ApiProperty({ example: '2025-04-18', description: 'Fecha de nacimiento del animal' })
  @Column({ type: 'date' })
  f_nacimiento: Date;

  @ApiProperty({ example: 'Sano', description: 'Estado de salud del animal' })
  @Column()
  estado: string;

  @ApiProperty({ example: 'NalaPerro', description: 'Chip del animal' })
  @Column()
  chip: string;

  @ApiProperty({ example: true, description: 'Si el animal esta esterelizado' })
  @Column({ default: false })
  esterilizado: boolean;

  @ApiProperty({ type: () => [Medicacion], description: 'Relaciones con medicacion' })
  @ManyToMany(() => Medicacion, (medicacion) => medicacion.animales)
  @JoinTable()
  medicaciones: Medicacion[];

  @ApiProperty({ type: () => Protectora, description: 'Protectora a la que pertenece el animal' })
  @ManyToOne(() => Protectora, (protectora) => protectora.id_protectora)
  protectora: Protectora;
    
}
