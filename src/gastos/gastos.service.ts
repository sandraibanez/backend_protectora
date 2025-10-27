import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Gastos } from './gastos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGastosDto, UpdateGastos } from './gastos.dto';

@Injectable()
export class GastosService {
    constructor(
        @InjectRepository(Gastos)
        private readonly gastosRepository: Repository<Gastos>,
    ) { }
    findAll(): Promise<Gastos[]> {
        return this.gastosRepository.find();
    }
    async getGastos(id: number): Promise<Gastos | string | null> {
        const gastos = await this.gastosRepository.findOneBy({ id });

        if (gastos != null) {
            return gastos;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createGastos(createGastosDto: CreateGastosDto): Promise<Gastos> {
        const gastos = await this.gastosRepository.create(createGastosDto);
        return this.gastosRepository.save(gastos);
    }
    async updateGastos(updateGastos: UpdateGastos): Promise<Gastos> {
        const gastos = await this.gastosRepository.findOne({
            where: { id: updateGastos.id },
        });

        if (!gastos) {
            throw new Error('Gasto no encontrado');
        }

        this.gastosRepository.merge(gastos, updateGastos);
        return this.gastosRepository.save(gastos);
    }

    async deleteGastos(id: number): Promise<void> {
        await this.gastosRepository.delete(id);
    }
}
