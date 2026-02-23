import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Protectora } from 'src/protectora/protectora.entity';
import { Acogida } from 'src/acogida/acogida.entity';
import { Apadrinamiento } from 'src/apadrinamiento/apadrinamiento.entity';
import { Adopcion } from 'src/adopcion/adopcion.entity';
import { Noticia } from 'src/noticia/noticia.entity';
import { HistorialMedico } from 'src/historial_medico/historial_medico.entity';

export enum RolUsuario {
  ADMIN = 'admin',
  TRABAJADOR = 'trabajador',
  CLIENTE = 'cliente',
  VETERINARIO = 'veterinario',
}
@Index(['email', 'protectora'], { unique: true })
@Entity('Users')
export class User {
  @ApiProperty({ example: 1, description: 'ID único del usuario' })
  @PrimaryGeneratedColumn()
  id_user: number;

  @ApiProperty({ example: 'Miriam', description: 'Nombre del usuario' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'claveSegura123', description: 'Contraseña del usuario' })
  @Column()
  contrasenya: string;

  @ApiProperty({ example: 'Calle Falsa 123', description: 'Dirección del usuario' })
  @Column()
  direccion: string;

  @ApiProperty({ example: 'miriam@example.com', description: 'Correo electrónico del usuario' })
  @Column()
  email: string;

  @ApiProperty({ example: 600123456, description: 'Número de teléfono del usuario' })
  @Column()
  telefono: number;

  @ApiProperty({ example: '12345678A', description: 'DNI del usuario' })
  @Column()
  DNI: string;

  @ApiProperty({
    enum: RolUsuario,
    example: RolUsuario.CLIENTE,
    description: 'Rol asignado al usuario',
  })
  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol: RolUsuario;

  @ManyToOne(() => Protectora, protectora => protectora.trabajadores)
  @JoinColumn({ name: 'id_protectora' })
  protectora: Protectora;

  @OneToMany(() => HistorialMedico, historial => historial.veterinario)
  historialesMedicos: HistorialMedico[];

  @OneToMany(() => Acogida, acogida => acogida.usuario)
  acogidas: Acogida[];

  @OneToMany(() => Apadrinamiento, apadrinamiento => apadrinamiento.usuario)
  apadrinamientos: Apadrinamiento[];

  @OneToMany(() => Adopcion, adopcion => adopcion.adoptante)
  adopciones: Adopcion[];

  @OneToMany(() => Noticia, noticia => noticia.autor)
  noticias: Noticia[];


}
