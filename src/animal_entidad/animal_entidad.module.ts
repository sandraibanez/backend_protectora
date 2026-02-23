import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal_Entidad } from './animal_entidad.entity';
import { AnimalEntidadController } from './animal_entidad.controller';
import { AnimalEntidadService } from './animal_entidad.service';
import { Animal } from 'src/animal/animal.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { AppConfig } from 'src/config/app.config';
import { AnimalModule } from 'src/animal/animal.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Animal_Entidad, Animal, Entidad]),
        AnimalModule
    ],
    controllers: [AnimalEntidadController],
    providers: [AnimalEntidadService, AppConfig],
    exports: [TypeOrmModule]
})
export class AnimalEntidadModule { }
