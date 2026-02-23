import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Noticia } from 'src/noticia/noticia.entity';

@Entity('protectoras') 
export class Protectora {
  @ApiProperty({ example: 1, description: 'ID único de la protectora' })
  @PrimaryGeneratedColumn()
  id_protectora: number;

  @ApiProperty({ example: 'Protectora Patitas Felices', description: 'Nombre de la protectora' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ example: 'Calle de la Esperanza 45, Valencia', description: 'Dirección física de la protectora' })
  @Column({ length: 100 })
  direccion: string;  

  @ApiProperty({ example: 962345678, description: 'Número de teléfono de contacto de la protectora' })
  @Column()
  telefono: number;

  @ApiProperty({ 
    type: () => [User], 
    description: 'Trabajadores y veterinarios asociados a la protectora' 
  })
  @OneToMany(() => User, user => user.protectora)
  trabajadores: User[];

  @ApiProperty({ 
    type: () => [Noticia], 
    description: 'Noticias de la protectora' 
  })
  @OneToMany(() => Noticia, noticia => noticia.protectora)
  noticias: Noticia[];

}
