import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal_Entidad } from './animal_entidad.entity';
import { CreateAnimalEntidadDto, UpdateAnimalEntidadDto } from './animal_entidad.dto';
import { Animal } from 'src/animal/animal.entity';
import { Entidad } from 'src/entidad/entidad.entity';

@Injectable()
export class AnimalEntidadService {
    constructor(
        @InjectRepository(Animal_Entidad)
        private readonly animalEntidadRepository: Repository<Animal_Entidad>,

        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,

        @InjectRepository(Entidad)
        private readonly entidadRepository: Repository<Entidad>,
    ) {}

    findAll(): Promise<Animal_Entidad[]> {
        return this.animalEntidadRepository.find({ relations: ['animal', 'entidad'] });
    }

    async getAnimalEntidad(id_animal_entidad: number): Promise<Animal_Entidad> {
        const animalEntidad = await this.animalEntidadRepository.findOne({
            where: { id_animal_entidad },
            relations: ['animal', 'entidad'],
        });
        if (!animalEntidad) {
            throw new HttpException('Animal-Entidad no encontrada', HttpStatus.NOT_FOUND);
        }
        return animalEntidad;
    }

    async createAnimalEntidad(createAnimalEntidadDto: CreateAnimalEntidadDto): Promise<Animal_Entidad> {

        const animal = await this.animalRepository.findOneBy({ id_animal: createAnimalEntidadDto.animal });
        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST)
        };

        const entidad = await this.entidadRepository.findOneBy({ id: createAnimalEntidadDto.entidad });
        if (!entidad) {
            throw new HttpException('Entidad no encontrada', HttpStatus.BAD_REQUEST)
        };

        const animalEntidad = this.animalEntidadRepository.create({
            ...createAnimalEntidadDto,
            animal,
            entidad,
        });

        return this.animalEntidadRepository.save(animalEntidad);
    }

    async updateAnimalEntidad(updateAnimalEntidadDto: UpdateAnimalEntidadDto): Promise<Animal_Entidad> {
        const animalEntidad = await this.animalEntidadRepository.findOne({
            where: { id_animal_entidad: updateAnimalEntidadDto.id_animal_entidad },
            relations: ['animal', 'entidad'],
        });
        if (!animalEntidad) {
            throw new HttpException('Animal-Entidad no encontrada', HttpStatus.NOT_FOUND)
        };

        if (updateAnimalEntidadDto.animal) {
            const animal = await this.animalRepository.findOneBy({ id_animal: updateAnimalEntidadDto.animal });
            if (!animal) {
                throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST)
            };
            animalEntidad.animal = animal;
        }

        if (updateAnimalEntidadDto.entidad) {
            const entidad = await this.entidadRepository.findOneBy({ id: updateAnimalEntidadDto.entidad });
            if (!entidad) {
                throw new HttpException('Entidad no encontrada', HttpStatus.BAD_REQUEST)
            };
            animalEntidad.entidad = entidad;
        }

        const camposSimples = {
            fecha: updateAnimalEntidadDto.fecha,
            ubicacion: updateAnimalEntidadDto.ubicacion,

        };
        this.animalEntidadRepository.merge(animalEntidad, camposSimples);
        return this.animalEntidadRepository.save(animalEntidad);
    }

    async deleteAnimalEntidad(id: number): Promise<void> {
        const animalEntidad = await this.animalEntidadRepository.findOneBy({ id_animal_entidad: id });
        if (!animalEntidad) {
            throw new HttpException('Animal-Entidad no encontrada', HttpStatus.NOT_FOUND)
        };
        await this.animalEntidadRepository.delete(id);
    }
}
