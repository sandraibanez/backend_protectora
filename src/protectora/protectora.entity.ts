import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Animal } from 'src/animal/animal.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';
import { Colonia } from 'src/colonias/colonia.entity';
import { DonacionesViveres } from 'src/donaciones_viveres/donaciones_viveres.entity';
import { Gasto } from 'src/gasto/gasto.entity';
import { Ingreso } from 'src/ingreso/ingreso.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

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
    type: () => [Veterinario], 
    description: 'Veterinarios asociados a la protectora' 
  })
  @ManyToMany(() => Veterinario, (veterinario) => veterinario.protectoras)
  veterinarios: Veterinario[];

  @OneToMany(() => User, user => user.protectora)
  trabajadores: User[];

}
