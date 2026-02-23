import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Protectora } from 'src/protectora/protectora.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal,
      Protectora,
      Animal_Entidad,
    ])],
  controllers: [AnimalController],
  providers: [AnimalService, AppConfig],
  exports: [TypeOrmModule, AnimalService]
})
export class AnimalModule {}
