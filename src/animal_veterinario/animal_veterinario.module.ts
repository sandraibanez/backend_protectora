import { Module } from '@nestjs/common';
import { AnimalVeterinarioController } from './animal_veterinario.controller';
import { AnimalVeterinarioService } from './animal_veterinario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalVeterinario } from './animal_veterinario.entity';
import { Animal } from 'src/animal/animal.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalVeterinario, Animal, Veterinario])],
  controllers: [AnimalVeterinarioController],
  providers: [AnimalVeterinarioService],
  exports: [TypeOrmModule]
})
export class AnimalVeterinarioModule {}

