import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngresosDto, UpdateIngresos } from './ingresos.dto';
import { Ingresos } from './ingresos.entity';

@Injectable()
export class IngresosService {
    constructor(
        @InjectRepository(Ingresos)
        private readonly IngresosRepository: Repository<Ingresos>,
    ) { }
    findAll(): Promise<Ingresos[]> {
        return this.IngresosRepository.find();
    }
    async getIngresos(id: number): Promise<Ingresos | string | null> {
        const Ingresos = await this.IngresosRepository.findOneBy({ id });

        if (Ingresos != null) {
            return Ingresos;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createIngresos(createIngresosDto: CreateIngresosDto): Promise<Ingresos> {
        const Ingresos = await this.IngresosRepository.create(createIngresosDto);
        return this.IngresosRepository.save(Ingresos);
    }
    async updateIngresos(updateIngresos: UpdateIngresos): Promise<Ingresos> {
        const Ingresos = await this.IngresosRepository.findOne({
            where: { id: updateIngresos.id },
        });

        if (!Ingresos) {
            throw new Error('Ingreso no encontrado');
        }

        this.IngresosRepository.merge(Ingresos, updateIngresos);
        return this.IngresosRepository.save(Ingresos);
    }

    async deleteIngresos(id: number): Promise<void> {
        await this.IngresosRepository.delete(id);
    }
}
