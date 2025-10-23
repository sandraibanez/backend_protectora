import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal_Veterinario } from './animal_veterinario.entity';
import { CreateAnimalVeterinarioDto, UpdateAnimalVeterinario } from './animal_veterinario.dto';

@Injectable()
export class AnimalVeterinarioService {
    constructor(
        @InjectRepository(Animal_Veterinario)
        private readonly animalVeterinarioRepository: Repository<Animal_Veterinario>,
    ) { }
        findAll(): Promise<Animal_Veterinario[]> {
        return this.animalVeterinarioRepository.find();
    }

    async getAnimalVeterinario(id: number): Promise<Animal_Veterinario | string | null> {
        const animalVeterinario = await this.animalVeterinarioRepository.findOneBy({ id });

        if (animalVeterinario != null) {
            return animalVeterinario;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    async createAnimalVeterinario(createAnimalVeterinarioDto: CreateAnimalVeterinarioDto): Promise<Animal_Veterinario> {
        const animalVeterinario = await this.animalVeterinarioRepository.create(createAnimalVeterinarioDto);
        return this.animalVeterinarioRepository.save(animalVeterinario);
    }

    async updateAnimalVeterinario(updateAnimalVeterinario: UpdateAnimalVeterinario): Promise<Animal_Veterinario> {
        const animalVeterinario = await this.animalVeterinarioRepository.findOne({
            where: { id: updateAnimalVeterinario.id },
        });

        if (!animalVeterinario) {
            throw new Error('Animal-Veterinario no encontrado');
        }

        this.animalVeterinarioRepository.merge(animalVeterinario, updateAnimalVeterinario);
        return this.animalVeterinarioRepository.save(animalVeterinario);
    }

    async deleteAnimalVeterinario(id: number): Promise<void> {
        await this.animalVeterinarioRepository.delete(id);
    }
}
