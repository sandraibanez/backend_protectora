import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colonias } from './colonias.entity';
import { Repository } from 'typeorm';
import { CreateColoniaDto, UpdateColonia } from './colonia.dto';

@Injectable()
export class ColoniasService {
    constructor(
        @InjectRepository(Colonias)
        private readonly coloniaRepository: Repository<Colonias>,
    ) { }
    findAll(): Promise<Colonias[]> {
        return this.coloniaRepository.find();
    }
    async getColonia(id: number): Promise<Colonias | string | null> {
        const colonia = await this.coloniaRepository.findOneBy({ id });

        if (colonia != null) {
            return colonia;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createColonia(createColoniaDto: CreateColoniaDto): Promise<Colonias> {
        const colonia = await this.coloniaRepository.create(createColoniaDto);
        return this.coloniaRepository.save(colonia);
    }
    async updateColonia(updateColonia: UpdateColonia): Promise<Colonias> {
        const colonia = await this.coloniaRepository.findOne({
            where: { id: updateColonia.id },
        });

        if (!colonia) {
            throw new Error('Colonia no encontrado');
        }

        this.coloniaRepository.merge(colonia, updateColonia);
        return this.coloniaRepository.save(colonia);
    }

    async deleteColonia(id: number): Promise<void> {
        await this.coloniaRepository.delete(id);
}
}
