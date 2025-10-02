import { Module } from '@nestjs/common';
import { ClinicaVeterinariaController } from './clinica_veterinaria.controller';
import { ClinicaVeterinariaService } from './clinica_veterinaria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica_veterinaria } from './clinica_veterinaria.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Clinica_veterinaria])],
    controllers: [ClinicaVeterinariaController],
    providers: [ClinicaVeterinariaService]
})
export class ClinicaVeterinariaModule { }
