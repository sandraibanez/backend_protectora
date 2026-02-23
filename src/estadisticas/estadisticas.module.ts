import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';
import { Animal } from 'src/animal/animal.entity';
import { Ingreso } from 'src/ingreso/ingreso.entity';
import { Acogida } from 'src/acogida/acogida.entity';
import { Apadrinamiento } from 'src/apadrinamiento/apadrinamiento.entity';
import { Adopcion } from 'src/adopcion/adopcion.entity';
import { Colonia } from 'src/colonias/colonia.entity';
import { HistorialMedico } from 'src/historial_medico/historial_medico.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal,
      Ingreso,
      Acogida,
      Apadrinamiento,
      Adopcion,
      Colonia,
      HistorialMedico,
    ]),
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService, AppConfig],
  exports: [EstadisticasService],
})
export class EstadisticasModule {}
