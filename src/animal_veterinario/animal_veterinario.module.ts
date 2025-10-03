import { Module } from '@nestjs/common';
import { AnimalVeterinarioController } from './animal_veterinario.controller';
import { AnimalVeterinarioService } from './animal_veterinario.service';

@Module({
  controllers: [AnimalVeterinarioController],
  providers: [AnimalVeterinarioService]
})
export class AnimalVeterinarioModule {}
