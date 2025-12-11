import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalDto, UpdateAnimalDto } from './animal.dto';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Protectora } from 'src/protectora/protectora.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';
import { Animal_Entidad } from 'src/animal_entidad/animal_entidad.entity';
import { RelacionPersonaAnimal } from 'src/relacion_persona_animal/relacion_persona_animal.entity';

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,

        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,

        @InjectRepository(Medicacion)
        private readonly medicacionRepository: Repository<Medicacion>,

    ) {}

    // Obtener todos los animales
    findAll(): Promise<Animal[]> {
        return this.animalRepository.find({
            relations: ['protectora', 'medicaciones'],
        });
    }

    // Obtener un animal por ID
    async getAnimal(id_animal: number): Promise<Animal> {
        const animal = await this.animalRepository.findOne({
        where: { id_animal },
            relations: ['protectora', 'medicaciones'],
        });

        if (!animal) {
            throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
        }

        return animal;
    }

    async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animal> {

        // Validar protectora
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: createAnimalDto.protectora });
        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
        }

        // Validar medicaciones
        // let medicaciones: Medicacion[] = [];
        let medicaciones: Medicacion[] | undefined;
        // createAnimalDto.medicaciones - Verifica que el campo exista y no sea undefined o null.
        // createAnimalDto.medicaciones.length > 0 - Verifica que el array no esté vacío.
        if (createAnimalDto.medicaciones && createAnimalDto.medicaciones.length > 0) {
            medicaciones = await this.medicacionRepository.findBy({
                // Devuelve todas las medicaciones que su id_medicacion esté dentro del array
                id_medicacion: In(createAnimalDto.medicaciones),
            });

            if (medicaciones.length !== createAnimalDto.medicaciones.length) {
                throw new HttpException('Alguna medicación introducida no existe', HttpStatus.BAD_REQUEST);
            }
        }

        // Crear el animal pasando objetos
        const animal = this.animalRepository.create({
            ...createAnimalDto,
            protectora,
            medicaciones,
        });

        // Guardar y devolver
        return this.animalRepository.save(animal);
    }

    async updateAnimal(updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
        // Buscar el animal existente con sus relaciones
        const animal = await this.animalRepository.findOne({
            where: { id_animal: updateAnimalDto.id_animal },
            relations: ['protectora', 'medicaciones'],
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

        // Actualizar medicaciones
        if (updateAnimalDto.medicaciones) {
            const medicaciones = await this.medicacionRepository.findBy({
                id_medicacion: In(updateAnimalDto.medicaciones),
            });
            if (medicaciones.length !== updateAnimalDto.medicaciones.length) {
                throw new HttpException('Alguna medicación no existe', HttpStatus.BAD_REQUEST);
            }
            animal.medicaciones = medicaciones;
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
