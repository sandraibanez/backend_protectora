import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Medicacion } from './medicacion.entity';
import { CreateMedicacionDto, UpdateMedicacionDto } from './medicacion.dto';
import { Animal } from 'src/animal/animal.entity';

@Injectable()
export class MedicacionService {
    constructor(
        @InjectRepository(Medicacion)
        private readonly medicacionRepository: Repository<Medicacion>,

        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,
    ) {}

    // Obtener todas las medicaciones
    findAll(): Promise<Medicacion[]> {
        return this.medicacionRepository.find({
            relations: ['animales'],
        });
    }

    // Obtener una medicación por ID
    async getMedicacion(id_medicacion: number): Promise<Medicacion> {
        const medicacion = await this.medicacionRepository.findOne({
            where: { id_medicacion },
            relations: ['animales'],
        });

        if (!medicacion) {
            throw new HttpException('Medicacion no encontrada', HttpStatus.NOT_FOUND);
        }

        return medicacion;
    }

    // Crear una nueva medicación
    async createMedicacion(createMedicacionDto: CreateMedicacionDto): Promise<Medicacion> {
        // Validar animales
        let animales: Animal[] = [];
        if (createMedicacionDto.animales && createMedicacionDto.animales.length > 0) {
            animales = await this.animalRepository.findBy({
                id_animal: In(createMedicacionDto.animales),
            });

            if (animales.length !== createMedicacionDto.animales.length) {
                throw new HttpException('Algún animal introducido no existe', HttpStatus.BAD_REQUEST);
            }
        }

        // Crear la medicación
        const medicacion = this.medicacionRepository.create({
            ...createMedicacionDto,
            animales,
        });

        // Guardar y devolver
        return this.medicacionRepository.save(medicacion);
    }

    // Actualizar una medicación existente
    async updateMedicacion(updateMedicacionDto: UpdateMedicacionDto): Promise<Medicacion> {
        // Buscar la medicación existente con sus relaciones
        const medicacion = await this.medicacionRepository.findOne({
            where: { id_medicacion: updateMedicacionDto.id_medicacion },
            relations: ['animales'],
        });

        if (!medicacion) {
            throw new HttpException('Medicacion no encontrada', HttpStatus.NOT_FOUND);
        }

        // Actualizar campos simples
        const camposSimples = {
            f_inicio: updateMedicacionDto.f_inicio,
            f_fin: updateMedicacionDto.f_fin,
            nombre: updateMedicacionDto.nombre,
            dosis: updateMedicacionDto.dosis,
            foto_receta: updateMedicacionDto.foto_receta,
        };
        this.medicacionRepository.merge(medicacion, camposSimples);

        // Validar y actualizar animales si se proporcionan
        if (updateMedicacionDto.animales && updateMedicacionDto.animales.length > 0) {
            const animales = await this.animalRepository.findBy({
                id_animal: In(updateMedicacionDto.animales),
            });
            if (animales.length !== updateMedicacionDto.animales.length) {
                throw new HttpException('Algún animal introducido no existe', HttpStatus.BAD_REQUEST);
            }
            medicacion.animales = animales;
        }

        // Guardar cambios
        return this.medicacionRepository.save(medicacion);
    }

    // Eliminar una medicación por ID
    async deleteMedicacion(id: number): Promise<void> {
        // Buscar la medicación primero
        const medicacion = await this.medicacionRepository.findOneBy({ id_medicacion: id });

        if (!medicacion) {
            throw new HttpException('Medicacion no encontrada', HttpStatus.NOT_FOUND);
        }

        // Eliminar la medicación
        await this.medicacionRepository.delete(id);
    }
}
