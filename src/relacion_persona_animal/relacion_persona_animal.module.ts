import { Module } from '@nestjs/common';
import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';
import { RelacionPersonaAnimalController } from './relacion_persona_animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relacion_Persona_Animal } from './relacion_persona_animal.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Relacion_Persona_Animal])],
    controllers: [RelacionPersonaAnimalController],
    providers: [RelacionPersonaAnimalService]
})
export class RelacionPersonaAnimalModule { }
