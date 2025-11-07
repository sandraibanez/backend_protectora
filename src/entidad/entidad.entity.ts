import { Entity, Column, PrimaryGeneratedColumn,ManyToMany , JoinTable, OneToMany } from 'typeorm';
import { Animales } from 'src/animales/animales.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('entidad')

export class Entidad {
  @ApiProperty({ example: 1, description: 'ID de la entidad' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nerea', description: 'Nombre de la entidad' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Civil', description: 'Si se trata de un civil o una entidad como un ayuntamiento el que rescata al animal' })
  @Column()
  tipo: string;
  
  @ApiProperty({ type: () => [Animal_Entidad], description: 'Relaciones con entidad' })
  @OneToMany(()=> Animal_Entidad, animal_entidad => animal_entidad.id)
  animal_entidad: Animal_Entidad[];
}