import { Module } from '@nestjs/common';
import { MedicacionController } from './medicacion.controller';
import { MedicacionService } from './medicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicacion } from './medicacion.entity';
import { Animal } from 'src/animal/animal.entity';
import { AnimalModule } from 'src/animal/animal.module';
import { Veterinario } from 'src/veterinario/veterinario.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([Medicacion, Animal]),
        AnimalModule,
    ],
    controllers: [MedicacionController],
    providers: [MedicacionService], 
    exports: [TypeOrmModule]
})
export class MedicacionModule { }
