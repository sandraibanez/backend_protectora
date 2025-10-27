import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Protectoras } from './protectoras.entity';
import { CreateProtectorasDto, UpdateProtectoras } from './protectoras.dto';

@Injectable()
export class ProtectorasService {
    constructor(
        @InjectRepository(Protectoras)
        private readonly ProtectorasRepository: Repository<Protectoras>,
    ) { }
    findAll(): Promise<Protectoras[]> {
        return this.ProtectorasRepository.find();
    }
    async getProtectoras(id: number): Promise<Protectoras | string | null> {
        const protectoras = await this.ProtectorasRepository.findOneBy({ id });

        if (protectoras != null) {
            return protectoras;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createProtectoras(createProtectorasDto: CreateProtectorasDto): Promise<Protectoras> {
        const protectoras = await this.ProtectorasRepository.create(createProtectorasDto);
        return this.ProtectorasRepository.save(protectoras);
    }
    async updateProtectoras(updateProtectoras: UpdateProtectoras): Promise<Protectoras> {
        const protectoras = await this.ProtectorasRepository.findOne({
            where: { id: updateProtectoras.id },
        });

        if (!protectoras) {
            throw new Error('Protectora no encontrado');
        }

        this.ProtectorasRepository.merge(protectoras, updateProtectoras);
        return this.ProtectorasRepository.save(protectoras);
    
    }

    async deleteProtectoras(id: number): Promise<void> {
        await this.ProtectorasRepository.delete(id);
    }
}
