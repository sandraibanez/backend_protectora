import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Protectora } from './protectora.entity';
import { CreateProtectoraDto, UpdateProtectoraDto } from './protectora.dto';

@Injectable()
export class ProtectoraService {
    constructor(
        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,
    ) {}

    // Obtener todas las protectoras
    findAll(): Promise<Protectora[]> {
        return this.protectoraRepository.find();
    }

    // Obtener una protectora por ID
    async getProtectora(id_protectora: number): Promise<Protectora> {
        const protectora = await this.protectoraRepository.findOne({
            where: { id_protectora },
        });

        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
        }

        return protectora;
    }

    // Crear una nueva protectora
    async createProtectora(createProtectoraDto: CreateProtectoraDto): Promise<Protectora> {
        const protectora = this.protectoraRepository.create(createProtectoraDto);
        return this.protectoraRepository.save(protectora);
    }

    // Actualizar una protectora existente
    async updateProtectora(updateProtectoraDto: UpdateProtectoraDto): Promise<Protectora> {
        const protectora = await this.protectoraRepository.findOne({
            where: { id_protectora: updateProtectoraDto.id_protectora },
        });

        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
        }

        const camposSimples = {
            nombre: updateProtectoraDto.nombre,
            direccion: updateProtectoraDto.direccion,
            telefono: updateProtectoraDto.telefono,
        };
        this.protectoraRepository.merge(protectora, camposSimples);

        return this.protectoraRepository.save(protectora);
    }

    // Eliminar una protectora por ID
    async deleteProtectora(id: number): Promise<void> {
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: id });

        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
        }

        await this.protectoraRepository.delete(id);
    }
}
