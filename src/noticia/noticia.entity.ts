import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Protectora } from 'src/protectora/protectora.entity';
import { User } from 'src/user/user.entity';

@Entity('noticias')
export class Noticia {
  @ApiProperty({
    example: 1,
    description: 'ID único de la noticia',
  })
  @PrimaryGeneratedColumn()
  id_noticia: number;

  @ApiProperty({
    example: 'Nuevo refugio para gatos',
    description: 'Título de la noticia',
  })
  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @ApiProperty({
    example: 'Hemos inaugurado un nuevo refugio para gatos abandonados...',
    description: 'Contenido completo de la noticia',
  })
  @Column({ type: 'text' })
  contenido: string;

  @ApiProperty({
    example: 'https://example.com/imagen.jpg',
    description: 'URL de la imagen de la noticia',
  })
  @Column({ nullable: true })
  imagen: string;

  @ApiProperty({
    example: '2025-04-18T14:30:00Z',
    description: 'Fecha de publicación de la noticia',
  })
  @CreateDateColumn({ type: 'timestamp' })
  fecha_publicacion: Date;

  @ApiProperty({
    example: true,
    description: 'Indica si la noticia está publicada',
  })
  @Column({ default: true })
  publicada: boolean;

  @ApiProperty({
    type: () => Protectora,
    description: 'Protectora a la que pertenece la noticia',
  })
  @ManyToOne(() => Protectora, protectora => protectora.noticias)
  @JoinColumn({ name: 'id_protectora' })
  protectora: Protectora;

  @ApiProperty({
    type: () => User,
    description: 'Usuario que creó la noticia',
  })
  @ManyToOne(() => User, user => user.noticias)
  @JoinColumn({ name: 'id_user' })
  autor: User;
}
