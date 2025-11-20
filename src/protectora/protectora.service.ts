import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Protectora } from './protectora.entity';
import { CreateProtectoraDto, UpdateProtectoraDto } from './protectora.dto';
import { Animal } from 'src/animal/animal.entity';
import { Colonia } from 'src/colonias/colonia.entity';
import { Veterinario } from 'src/veterinario/veterinario.entity';

@Injectable()
export class ProtectoraService {
    constructor(
        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,

        @InjectRepository(Veterinario)
        private readonly veterinarioRepository: Repository<Veterinario>,
    ) {}

    // Obtener todas las protectoras
    findAll(): Promise<Protectora[]> {
        return this.protectoraRepository.find({
            relations: ['veterinarios'],
        });
    }

    // Obtener una protectora por ID
    async getProtectora(id_protectora: number): Promise<Protectora> {
        const protectora = await this.protectoraRepository.findOne({
            where: { id_protectora },
            relations: ['veterinarios'],
        });

        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
        }

        return protectora;
    }

    // Crear una nueva protectora
    async createProtectora(createProtectoraDto: CreateProtectoraDto): Promise<Protectora> {

        if (typeof createProtectoraDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (typeof createProtectoraDto.direccion !== 'string') {
            throw new HttpException('La dirección debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createProtectoraDto.telefono !== 'number') {
            throw new HttpException('El teléfono debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (createProtectoraDto.veterinarios && !Array.isArray(createProtectoraDto.veterinarios)) {
            throw new HttpException('Los veterinarios deben ser un array de IDs numéricos', HttpStatus.BAD_REQUEST);
        }

        let veterinarios: Veterinario[] = [];
        if (createProtectoraDto.veterinarios && createProtectoraDto.veterinarios.length > 0) {
            veterinarios = await this.veterinarioRepository.findBy({ id_veterinario: In(createProtectoraDto.veterinarios) });
            if (veterinarios.length !== createProtectoraDto.veterinarios.length) {
                throw new HttpException('Algún veterinario no existe', HttpStatus.BAD_REQUEST);
            }
        }

        const protectora = this.protectoraRepository.create({
            ...createProtectoraDto,
            veterinarios,
        });

        return this.protectoraRepository.save(protectora);
    }

    // Actualizar una protectora existente
    async updateProtectora(updateProtectoraDto: UpdateProtectoraDto): Promise<Protectora> {
        const protectora = await this.protectoraRepository.findOne({
            where: { id_protectora: updateProtectoraDto.id_protectora },
            relations: ['veterinarios'],
        });

        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.NOT_FOUND);
        }

        if (updateProtectoraDto.nombre !== undefined && typeof updateProtectoraDto.nombre !== 'string') {
            throw new HttpException('El nombre debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (updateProtectoraDto.direccion !== undefined && typeof updateProtectoraDto.direccion !== 'string') {
            throw new HttpException('La dirección debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (updateProtectoraDto.telefono !== undefined && typeof updateProtectoraDto.telefono !== 'number') {
            throw new HttpException('El teléfono debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (updateProtectoraDto.veterinarios !== undefined && !Array.isArray(updateProtectoraDto.veterinarios)) {
            throw new HttpException('Los veterinarios deben ser un array de IDs numéricos', HttpStatus.BAD_REQUEST);
        }

        if (updateProtectoraDto.veterinarios) {
            const veterinarios = await this.veterinarioRepository.findBy({ id_veterinario: In(updateProtectoraDto.veterinarios) });
            if (veterinarios.length !== updateProtectoraDto.veterinarios.length) {
                throw new HttpException('Algún veterinario no existe', HttpStatus.BAD_REQUEST);
            }
            protectora.veterinarios = veterinarios;
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
