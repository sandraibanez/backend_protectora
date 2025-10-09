import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal_Entidad } from './animal_entidad.entity';
import { AnimalEntidadController } from './animal_entidad.controller';
import { AnimalEntidadService } from './animal_entidad.service';
@Module({
    imports: [TypeOrmModule.forFeature([Animal_Entidad])],
    controllers: [AnimalEntidadController],
    providers: [AnimalEntidadService],
  
})
export class AnimalEntidadModule { }
