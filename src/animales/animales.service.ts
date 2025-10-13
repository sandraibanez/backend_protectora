import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animales } from './animales.entity';
import { CreateAnimalDto, UpdateAnimales } from './animales.dto';
@Injectable()
export class AnimalesService {
    constructor(
        @InjectRepository(Animales)
        private readonly animalesRepository: Repository<Animales>,
    ) { }
    findAll(): Promise<Animales[]> {
        return this.animalesRepository.find();
    }

    async getAnimal(id: number): Promise<Animales | string | null> {
        const animal = await this.animalesRepository.findOneBy({ id });

        if (animal != null) {
            return animal;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animales> {
        const animal = await this.animalesRepository.create(createAnimalDto);
        // const passwordHash = await bcrypt.hash(await usuario.password, 10); 
        // usuario.password = passwordHash;
        return this.animalesRepository.save(animal);
    }
    async updateAnimal(updateAnimal: UpdateAnimales): Promise<Animales> {
        const animal = await this.animalesRepository.findOne({
            where: { id: updateAnimal.id },
        });

        if (!animal) {
            throw new Error('Animal no encontrado');
        }

        this.animalesRepository.merge(animal, updateAnimal);
        return this.animalesRepository.save(animal);
    }

    async deleteAnimal(id: number): Promise<void> {
        await this.animalesRepository.delete(id);
    }
}




