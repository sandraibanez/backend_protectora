import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { Protectora } from 'src/protectora/protectora.entity';

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,

        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,
    ) {}

    // Obtener todos los animales
    findAll(): Promise<Animal[]> {
        return this.animalRepository.find({
            relations: ['protectora'],
        });
    }

    // Obtener un animal por ID
    async getAnimal(id_animal: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne({
        where: { id_animal },
            relations: ['protectora'],
        });

        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
        }

        return animal;
    }

    // Obtener todos los animales por protectora
    async findByProtectora(idProtectora: number): Promise<Animal[]> {
        // Validar protectora
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: idProtectora});
        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
        }

        return this.animalRepository.find({
            where: { protectora: { id_protectora: idProtectora } },
            relations: ['protectora'],
            order: { id_animal: 'ASC' }
        });
    }

    async createAnimal(idProtectora: number, createAnimalDto: CreateAnimalDto): Promise<Animal> {

        // Validar protectora
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: createAnimalDto.protectora });
        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
        }


        // Crear el animal pasando objetos
        const animal = this.animalRepository.create({
            ...createAnimalDto,
            protectora,
        });

        // Guardar y devolver
        return this.animalRepository.save(animal);
    }

    

    async updateAnimal(id_animal: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
        // Buscar el animal existente con sus relaciones
        const animal = await this.animalRepository.findOne({
            where: { id_animal},
            relations: ['protectora'],
        });

        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
        }

        // Actualizar protectora si se proporciona
        if (updateAnimalDto.protectora !== undefined) {
            const protectora = await this.protectoraRepository.findOneBy({ id_protectora: updateAnimalDto.protectora });
            if (!protectora) {
                throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
            }
            animal.protectora = protectora;
        }

        // Actualizar campos simples
        const camposSimples = {
            nombre: updateAnimalDto.nombre,
            raza: updateAnimalDto.raza,
            foto: updateAnimalDto.foto,
            sexo: updateAnimalDto.sexo,
            especie: updateAnimalDto.especie,
            f_nacimiento: updateAnimalDto.f_nacimiento,
            estado: updateAnimalDto.estado,
            chip: updateAnimalDto.chip,
            esterilizado: updateAnimalDto.esterilizado,
        };
        this.animalRepository.merge(animal, camposSimples);

        // Guardar cambios
        return this.animalRepository.save(animal);
    }

    // Eliminar un animal por ID
    async deleteAnimal(id: number): Promise<void> {
        // Buscar el animal primero
        const animal = await this.animalRepository.findOneBy({ id_animal: id });

        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
        }

        // Eliminar el animal
        await this.animalRepository.delete(id);
    }

}
