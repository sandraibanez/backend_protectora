import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalVeterinario } from './animal_veterinario.entity';
import { CreateAnimalVeterinarioDto, UpdateAnimalVeterinarioDto } from './animal_veterinario.dto';
import { Animal } from 'src/animal/animal.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';

@Injectable()
export class AnimalVeterinarioService {
    constructor(
        @InjectRepository(AnimalVeterinario)
        private readonly animalVeterinarioRepository: Repository<AnimalVeterinario>,

        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,

        @InjectRepository(Veterinario)
        private readonly veterinarioRepository: Repository<Veterinario>,
    ) {}

    // Obtener todos los registros
    findAll(): Promise<AnimalVeterinario[]> {
        return this.animalVeterinarioRepository.find({ relations: ['animal', 'veterinario'] });
    }

    // Obtener un registro por ID
    async getAnimalVeterinario(id_animalVeterinario: number): Promise<AnimalVeterinario> {
        const animalVeterinario = await this.animalVeterinarioRepository.findOne({
            where: { id_animalVeterinario },
            relations: ['animal', 'veterinario'],
        });
        if (!animalVeterinario) {
            throw new HttpException('Animal-Veterinario no encontrado', HttpStatus.NOT_FOUND);
        }
        return animalVeterinario;
    }

    // Crear un nuevo registro
    async createAnimalVeterinario(createAnimalVeterinarioDto: CreateAnimalVeterinarioDto): Promise<AnimalVeterinario> {
        const animal = await this.animalRepository.findOneBy({ id_animal: createAnimalVeterinarioDto.animal });
        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST);
        }

        const veterinario = await this.veterinarioRepository.findOneBy({ id_veterinario: createAnimalVeterinarioDto.veterinario });
        if (!veterinario) {
            throw new HttpException('Veterinario no encontrado', HttpStatus.BAD_REQUEST);
        }

        const animalVeterinario = this.animalVeterinarioRepository.create({
            ...createAnimalVeterinarioDto,
            animal,
            veterinario,
        });

        return this.animalVeterinarioRepository.save(animalVeterinario);
    }

    // Actualizar un registro 
    async updateAnimalVeterinario(updateAnimalVeterinarioDto: UpdateAnimalVeterinarioDto): Promise<AnimalVeterinario> {
        const animalVeterinario = await this.animalVeterinarioRepository.findOne({
            where: { id_animalVeterinario: updateAnimalVeterinarioDto.id_animalVeterinario },
            relations: ['animal', 'veterinario'],
        });
        if (!animalVeterinario) {
            throw new HttpException('Animal-Veterinario no encontrado', HttpStatus.NOT_FOUND);
        }

        if (updateAnimalVeterinarioDto.animal !== undefined) {
            const animal = await this.animalRepository.findOneBy({ id_animal: updateAnimalVeterinarioDto.animal });
            if (!animal) {
                throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST)
            };
            animalVeterinario.animal = animal;
        }

        if (updateAnimalVeterinarioDto.veterinario !== undefined) {
            const veterinario = await this.veterinarioRepository.findOneBy({ id_veterinario: updateAnimalVeterinarioDto.veterinario });
            if (!veterinario) {
                throw new HttpException('Veterinario no encontrado', HttpStatus.BAD_REQUEST)
            };
            animalVeterinario.veterinario = veterinario;
        }

        // Merge de los campos simples
        const { 
            animal, 
            veterinario, 
            ...camposSimples 
        } = updateAnimalVeterinarioDto;
        
        this.animalVeterinarioRepository.merge(animalVeterinario, camposSimples);

        return this.animalVeterinarioRepository.save(animalVeterinario);
    }

    // Eliminar un registro
    async deleteAnimalVeterinario(id: number): Promise<void> {
        const animalVeterinario = await this.animalVeterinarioRepository.findOneBy({ id_animalVeterinario: id });
        if (!animalVeterinario) {
            throw new HttpException('Animal-Veterinario no encontrado', HttpStatus.NOT_FOUND);
        }
        await this.animalVeterinarioRepository.delete(id);
    }
}
