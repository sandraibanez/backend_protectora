import { Module } from '@nestjs/common';
import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';
import { RelacionPersonaAnimalController } from './relacion_persona_animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelacionPersonaAnimal } from './relacion_persona_animal.entity';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';
@Module({
    imports: [TypeOrmModule.forFeature([RelacionPersonaAnimal, Animal, User])],
    controllers: [RelacionPersonaAnimalController],
    providers: [RelacionPersonaAnimalService],
    exports:[TypeOrmModule]
})
export class RelacionPersonaAnimalModule { }
