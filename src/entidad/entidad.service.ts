import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Entidad } from './entidad.entity';
import { CreateEntidadDto, UpdateEntidad } from './entidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EntidadService {
    constructor(
        @InjectRepository(Entidad)
        private readonly EntidadRepository: Repository<Entidad>,
    ) { }
    findAll(): Promise<Entidad[]> {
        return this.EntidadRepository.find();
    }
    async getEntidad(id: number): Promise<Entidad | string | null> {
        const entidad = await this.EntidadRepository.findOneBy({ id });

        if (entidad != null) {
            return entidad;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createEntidad(createEntidadDto: CreateEntidadDto): Promise<Entidad> {
        const entidad = await this.EntidadRepository.create(createEntidadDto);
        return this.EntidadRepository.save(entidad);
    }
    async updateEntidad(updateEntidad: UpdateEntidad): Promise<Entidad> {
        const entidad = await this.EntidadRepository.findOne({
            where: { id: updateEntidad.id },
        });

        if (!entidad) {
            throw new Error('Colonia no encontrado');
        }

        this.EntidadRepository.merge(entidad, updateEntidad);
        return this.EntidadRepository.save(entidad);
    }

    async deleteEntidad(id: number): Promise<void> {
        await this.EntidadRepository.delete(id);
    }
}
