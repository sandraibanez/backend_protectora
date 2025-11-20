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
        if (typeof createAnimalDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (typeof createAnimalDto.raza !== 'string') {
            throw new HttpException('La raza debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createAnimalDto.f_nacimiento !== 'string' && !(createAnimalDto.f_nacimiento instanceof Date)) {
            throw new HttpException('La fecha de nacimiento debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof createAnimalDto.f_nacimiento === 'string') {
            if (isNaN(Date.parse(createAnimalDto.f_nacimiento))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (typeof createAnimalDto.esterilizado !== 'boolean' && createAnimalDto.esterilizado !== undefined) {
            throw new HttpException('El campo esterilizado debe ser true o false', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createAnimalDto.protectora !== 'number') {
            throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (createAnimalDto.medicaciones && !Array.isArray(createAnimalDto.medicaciones)) {
            throw new HttpException('Las medicaciones deben ser un array de números', HttpStatus.BAD_REQUEST);
        }

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

        if (updateAnimalDto.nombre !== undefined && typeof updateAnimalDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (updateAnimalDto.raza !== undefined && typeof updateAnimalDto.raza !== 'string') {
            throw new HttpException('La raza debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (updateAnimalDto.f_nacimiento !== undefined && typeof updateAnimalDto.f_nacimiento !== 'string' &&
            !(updateAnimalDto.f_nacimiento instanceof Date)) {
            throw new HttpException('La fecha de nacimiento debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof updateAnimalDto.f_nacimiento === 'string') {
            if (isNaN(Date.parse(updateAnimalDto.f_nacimiento))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (updateAnimalDto.esterilizado !== undefined && typeof updateAnimalDto.esterilizado !== 'boolean') {
            throw new HttpException('El campo esterilizado debe ser true o false', HttpStatus.BAD_REQUEST);
        }
        
        if (updateAnimalDto.protectora !== undefined && typeof updateAnimalDto.protectora !== 'number') {
            throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (updateAnimalDto.medicaciones !== undefined && !Array.isArray(updateAnimalDto.medicaciones)) {
            throw new HttpException('Las medicaciones deben ser un array de números', HttpStatus.BAD_REQUEST);
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
