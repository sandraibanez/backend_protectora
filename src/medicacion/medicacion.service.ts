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

        if (typeof createMedicacionDto.nombre !== 'string') {
            throw new HttpException('El nombre del medicamento debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createMedicacionDto.dosis !== 'string') {
            throw new HttpException('La dosis debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (createMedicacionDto.foto_receta && typeof createMedicacionDto.foto_receta !== 'string') {
            throw new HttpException('La foto de la receta debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (typeof createMedicacionDto.f_inicio !== 'string' && !(createMedicacionDto.f_inicio instanceof Date)) {
            throw new HttpException('La fecha de inicio debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof createMedicacionDto.f_inicio === 'string') {
            if (isNaN(Date.parse(createMedicacionDto.f_inicio))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (typeof createMedicacionDto.f_fin !== 'string' && !(createMedicacionDto.f_fin instanceof Date)) {
            throw new HttpException('La fecha de fin debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof createMedicacionDto.f_fin === 'string') {
            if (isNaN(Date.parse(createMedicacionDto.f_fin))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (createMedicacionDto.animales && !Array.isArray(createMedicacionDto.animales)) {
            throw new HttpException('Los animales deben ser un array de IDs numéricos', HttpStatus.BAD_REQUEST);
        }

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

        if (updateMedicacionDto.nombre !== undefined && typeof updateMedicacionDto.nombre !== 'string') {
            throw new HttpException('El nombre del medicamento debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (updateMedicacionDto.dosis !== undefined && typeof updateMedicacionDto.dosis !== 'string') {
            throw new HttpException('La dosis debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (updateMedicacionDto.foto_receta !== undefined && typeof updateMedicacionDto.foto_receta !== 'string') {
            throw new HttpException('La foto de la receta debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (updateMedicacionDto.f_inicio !== undefined &&
            typeof updateMedicacionDto.f_inicio !== 'string' &&
            !(updateMedicacionDto.f_inicio instanceof Date)) {
            throw new HttpException('La fecha de inicio debe ser una fecha válida', HttpStatus.BAD_REQUEST);

        }else if (typeof updateMedicacionDto.f_inicio === 'string') {
            if (isNaN(Date.parse(updateMedicacionDto.f_inicio))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        
        if (updateMedicacionDto.f_fin !== undefined &&
            typeof updateMedicacionDto.f_fin !== 'string' &&
            !(updateMedicacionDto.f_fin instanceof Date)) {
            throw new HttpException('La fecha de fin debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof updateMedicacionDto.f_fin === 'string') {
            if (isNaN(Date.parse(updateMedicacionDto.f_fin))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        
        if (updateMedicacionDto.animales !== undefined && !Array.isArray(updateMedicacionDto.animales)) {
            throw new HttpException('Los animales deben ser un array de IDs numéricos', HttpStatus.BAD_REQUEST);
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
