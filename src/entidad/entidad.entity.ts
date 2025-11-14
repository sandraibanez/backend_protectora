import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('entidades')
export class Entidad {
  @ApiProperty({ example: 1, description: 'ID único de la entidad' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Protectora Felina', description: 'Nombre de la entidad o persona responsable del rescate' })
  @Column()
  nombre: string;

  @ApiProperty({
    example: 'Civil',
    description: 'Tipo de entidad (por ejemplo: Civil, Ayuntamiento, Asociación, etc.)',
  })
  @Column()
  tipo: string;

}
