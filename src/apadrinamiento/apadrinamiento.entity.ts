import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

@Entity('apadrinamientos')
export class Apadrinamiento {
  @PrimaryGeneratedColumn()
  id_apadrinamiento: number;

  @ApiProperty({ example: '2025-04-18T14:30:00Z' })
  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @ApiProperty({ example: true })
  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Animal, animal => animal.apadrinamientos)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => User, user => user.apadrinamientos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;
}
