import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtectoraService } from './protectora.service';
import { Protectora } from './protectora.entity';
import { ProtectoraController } from './protectora.controller';
import { Animal } from 'src/animal/animal.entity';
import { Colonia } from 'src/colonias/colonia.entity';
import { DonacionesViveres } from 'src/donaciones_viveres/donaciones_viveres.entity';
import { Gasto } from 'src/gasto/gasto.entity';
import { Ingreso } from 'src/ingreso/ingreso.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Protectora,
      Animal,
      Colonia,
      DonacionesViveres,
      Gasto,
      Ingreso,
      Veterinario,
    ]),
  ],
  controllers: [ProtectoraController],
  providers: [ProtectoraService],
  exports:[TypeOrmModule]
})
export class ProtectoraModule { }
