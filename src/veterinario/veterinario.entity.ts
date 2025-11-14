import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Protectora } from 'src/protectora/protectora.entity';

@Entity('veterinarios')
export class Veterinario {
  @ApiProperty({
    example: 1,
    description: 'ID único del veterinario',
  })
  @PrimaryGeneratedColumn()
  id_veterinario: number;

  @ApiProperty({
    example: 'Clínica Patitas Felices',
    description: 'Nombre del veterinario o clínica veterinaria',
  })
  @Column()
  nombre: string;

  @ApiProperty({
    example: 'Calle San Bernardo 45, Valencia',
    description: 'Dirección del veterinario o clínica veterinaria',
  })
  @Column()
  direccion: string;

  @ApiProperty({
    example: 962345678,
    description: 'Número de teléfono del veterinario o clínica veterinaria',
  })
  @Column()
  telefono: number;

  @ApiProperty({
    type: () => [Protectora],
    description: 'Lista de protectoras asociadas a este veterinario',
  })
  @JoinTable()
  @ManyToMany(() => Protectora, (protectora) => protectora.veterinarios)
  protectoras: Protectora[];
}
