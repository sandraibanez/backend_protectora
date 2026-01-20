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
    ) {}

    // Obtener todas las medicaciones
    findAll(): Promise<Medicacion[]> {
        return this.medicacionRepository.find({
            relations: ['consultaMedicaciones'],
        });
    }

    // Obtener una medicación por ID
    async getMedicacion(id_medicacion: number): Promise<Medicacion> {
        const medicacion = await this.medicacionRepository.findOne({
            where: { id_medicacion },
            relations: ['consultaMedicaciones'],
        });

        if (!medicacion) {
            throw new HttpException('Medicacion no encontrada', HttpStatus.NOT_FOUND);
        }

        return medicacion;
    }

    // Crear una nueva medicación
    async createMedicacion(createMedicacionDto: CreateMedicacionDto): Promise<Medicacion> {

        // Crear la medicación
        const medicacion = this.medicacionRepository.create({
            ...createMedicacionDto,
        });

        // Guardar y devolver
        return this.medicacionRepository.save(medicacion);
    }

    // Actualizar una medicación existente
    async updateMedicacion(updateMedicacionDto: UpdateMedicacionDto): Promise<Medicacion> {
        // Buscar la medicación existente con sus relaciones
        const medicacion = await this.medicacionRepository.findOne({ 
            where: { id_medicacion: updateMedicacionDto.id_medicacion }, 
        });

        if (!medicacion) {
            throw new HttpException('Medicacion no encontrada', HttpStatus.NOT_FOUND);
        }

        // Actualizar campos simples
        const camposSimples = { 
            nombre: updateMedicacionDto.nombre, 
            descripcion: updateMedicacionDto.descripcion, 
            via_administracion: updateMedicacionDto.via_administracion, 
            foto_receta: updateMedicacionDto.foto_receta,
        };

        this.medicacionRepository.merge(medicacion, camposSimples);

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
