import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relacion_Persona_Animal } from './relacion_persona_animal.entity';
import {CreateRelacionPersonaAnimalDto, UpdateRelacionPersonaAnimalDto } from './relacion_persona_animal.dto';

@Injectable()
export class RelacionPersonaAnimalService {
  constructor(
        @InjectRepository(Relacion_Persona_Animal)
        private readonly relacionRepository: Repository<Relacion_Persona_Animal>,
    ) { }
    findAll(): Promise<Relacion_Persona_Animal[]> {
        return this.relacionRepository.find();
    }

    async getRelacion(id: number): Promise<Relacion_Persona_Animal | string | null> {
        const relacion = await this.relacionRepository.findOneBy({ id });

        if (relacion != null) {
            return relacion;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    async createRelacion(createRelacionPersonaAnimalDto: CreateRelacionPersonaAnimalDto): Promise<Relacion_Persona_Animal> {
        const relacion = await this.relacionRepository.create(createRelacionPersonaAnimalDto);
        return this.relacionRepository.save(relacion);
    }
    async updateRelacion(updateRelacionPersonaAnimalDto: UpdateRelacionPersonaAnimalDto): Promise<Relacion_Persona_Animal> {
        const relacion = await this.relacionRepository.findOne({
            where: { id: updateRelacionPersonaAnimalDto.id },
        });

        if (!relacion) {
            throw new Error('Relacion no encontrada');
        }

        this.relacionRepository.merge(relacion, updateRelacionPersonaAnimalDto);
        return this.relacionRepository.save(relacion);
    }
    async deleteRelacion(id: number): Promise<void> {
        await this.relacionRepository.delete(id);
    }
    

}
