import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal_Entidad } from './animal_entidad.entity';
import { CreateAnimalEntidadDto, UpdateAnimalEntidad } from './animal_entidad.dto';

@Injectable()
export class AnimalEntidadService {
    constructor(
        @InjectRepository(Animal_Entidad)
        private readonly animalEntidadRepository: Repository<Animal_Entidad>,
    ) { }
        findAll(): Promise<Animal_Entidad[]> {
        return this.animalEntidadRepository.find();
    }

    async getAnimalEntidad(id: number): Promise<Animal_Entidad | string | null> {
        const animalEntidad = await this.animalEntidadRepository.findOneBy({ id });

        if (animalEntidad != null) {
            return animalEntidad;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    async createAnimalEntidad(createAnimalEntidadDto: CreateAnimalEntidadDto): Promise<Animal_Entidad> {
        const animalEntidad = await this.animalEntidadRepository.create(createAnimalEntidadDto);
        return this.animalEntidadRepository.save(animalEntidad);
    }

    async updateAnimalEntidad(updateAnimalEntidad: UpdateAnimalEntidad): Promise<Animal_Entidad> {
        const animalEntidad = await this.animalEntidadRepository.findOne({
            where: { id: updateAnimalEntidad.id },
        });

        if (!animalEntidad) {
            throw new Error('Animal-Entidad no encontrada');
        }

        this.animalEntidadRepository.merge(animalEntidad, updateAnimalEntidad);
        return this.animalEntidadRepository.save(animalEntidad);
    }

    async deleteAnimalEntidad(id: number): Promise<void> {
        await this.animalEntidadRepository.delete(id);
    }

}
