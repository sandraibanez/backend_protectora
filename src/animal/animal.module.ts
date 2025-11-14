import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Protectora } from 'src/protectora/protectora.entity';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { RelacionPersonaAnimal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Animal,
      Protectora,
      AnimalVeterinario,
      Medicacion,
      RelacionPersonaAnimal,
      Animal_Entidad,
    ])],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [TypeOrmModule]
})
export class AnimalModule {}
