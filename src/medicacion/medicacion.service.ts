import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicacion } from './medicacion.entity';
import { Repository } from 'typeorm';
import { CreateMedicacionDto, UpdateMedicacion } from './medicacion.dto';

@Injectable()
export class MedicacionService {
    constructor(
        @InjectRepository(Medicacion)
        private readonly medicacionRepository: Repository<Medicacion>,
    ) { }
    findAll(): Promise<Medicacion[]> {
        return this.medicacionRepository.find();
    }
    async getMedicacion(id: number): Promise<Medicacion | string | null> {
        const animal = await this.medicacionRepository.findOneBy({ id });

        if (animal != null) {
            return animal;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createMedicacion(createMedicacionDto: CreateMedicacionDto): Promise<Medicacion> {
        const medicacion = await this.medicacionRepository.create(createMedicacionDto);
        return this.medicacionRepository.save(medicacion);
    }
    async updateMedicacion(updateMedicacion: UpdateMedicacion): Promise<Medicacion> {
        const medicacion = await this.medicacionRepository.findOne({
            where: { id: updateMedicacion.id },
        });

        if (!medicacion) {
            throw new Error('Medicacion no encontrado');
        }

        this.medicacionRepository.merge(medicacion, updateMedicacion);
        return this.medicacionRepository.save(medicacion);
    }

    async deleteMedicacion(id: number): Promise<void> {
        await this.medicacionRepository.delete(id);
    }
}
