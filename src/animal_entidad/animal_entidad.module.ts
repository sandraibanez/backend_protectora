import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal_Entidad } from './animal_entidad.entity';
import { AnimalEntidadController } from './animal_entidad.controller';
import { AnimalEntidadService } from './animal_entidad.service';
import { Animal } from 'src/animal/animal.entity';
import { Entidad } from 'src/entidad/entidad.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Animal_Entidad, Animal, Entidad])],
    controllers: [AnimalEntidadController],
    providers: [AnimalEntidadService],
    exports: [TypeOrmModule]
})
export class AnimalEntidadModule { }
