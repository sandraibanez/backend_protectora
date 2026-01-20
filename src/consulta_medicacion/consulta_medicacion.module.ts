import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaMedicacion } from './consulta_medicacion.entity';
import { ConsultaMedicacionController } from './consulta_medicacion.controller';
import { ConsultaMedicacionService } from './consulta_medicacion.service';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultaMedicacion,
      AnimalVeterinario,
      Medicacion
    ])
  ],
  controllers: [ConsultaMedicacionController],
  providers: [ConsultaMedicacionService],
  exports: [TypeOrmModule]
})
export class ConsultaMedicacionModule {}
