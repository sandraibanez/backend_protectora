import { Module } from '@nestjs/common';
import { AnimalVeterinarioController } from './animal_veterinario.controller';
import { AnimalVeterinarioService } from './animal_veterinario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal_Veterinario } from './animal_veterinario.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Animal_Veterinario])],
  controllers: [AnimalVeterinarioController],
  providers: [AnimalVeterinarioService]
})
export class AnimalVeterinarioModule {}
