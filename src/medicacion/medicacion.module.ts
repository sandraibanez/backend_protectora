import { Module } from '@nestjs/common';
import { MedicacionController } from './medicacion.controller';
import { MedicacionService } from './medicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicacion } from './medicacion.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Medicacion])],
    controllers: [MedicacionController],
    providers: [MedicacionService]
})
export class MedicacionModule { }
