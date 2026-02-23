import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from './historial_medico.entity';
import { HistorialMedicoController } from './historial_medico.controller';
import { HistorialMedicoService } from './historial_medico.service';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HistorialMedico,
      Animal,
      User,
    ])
  ],
  controllers: [HistorialMedicoController],
  providers: [HistorialMedicoService, AppConfig],
  exports: [TypeOrmModule],
})
export class HistorialMedicoModule {}
