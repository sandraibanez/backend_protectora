import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entidad } from './entidad.entity';
import { CreateEntidadDto, UpdateEntidadDto } from './entidad.dto';

@Injectable()
export class EntidadService {
    constructor(
        @InjectRepository(Entidad)
        private readonly entidadRepository: Repository<Entidad>,
    ) { }

    findAll(): Promise<Entidad[]> {
        return this.entidadRepository.find({});
    }

    async getEntidad(id: number): Promise<Entidad> {
        const entidad = await this.entidadRepository.findOne({
            where: { id }
        });

        if (!entidad) {
            throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
        }
        return entidad;
    }

    async createEntidad(createEntidadDto: CreateEntidadDto): Promise<Entidad> {
        if (typeof createEntidadDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }
        if (typeof createEntidadDto.tipo !== 'string') {
            throw new HttpException('El tipo debe ser texto', HttpStatus.BAD_REQUEST);
        }
        const entidad = this.entidadRepository.create(createEntidadDto);
        return this.entidadRepository.save(entidad);
    }

    async updateEntidad(updateEntidadDto: UpdateEntidadDto): Promise<Entidad> {
        const entidad = await this.entidadRepository.findOne({
            where: { id: updateEntidadDto.id }
        });

        if (!entidad) {
            throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
        }

        if (updateEntidadDto.nombre !== undefined && typeof updateEntidadDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (updateEntidadDto.tipo !== undefined && typeof updateEntidadDto.tipo !== 'string') {
            throw new HttpException('El tipo debe ser texto', HttpStatus.BAD_REQUEST);
        }

        // Actualiza solo los campos que vienen en el DTO
        this.entidadRepository.merge(entidad, updateEntidadDto);
        return this.entidadRepository.save(entidad);
    }

    async deleteEntidad(id: number): Promise<void> {
        const entidad = await this.entidadRepository.findOneBy({ id });
        if (!entidad) {
            throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
        }
        await this.entidadRepository.delete(id);
    }

}
