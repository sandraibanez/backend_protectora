import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonacionesViveres } from './donaciones_viveres.entity';
import { CreateAnimalDto } from 'src/animales/animales.dto';
import { CreateDonaciones_ViveresDto, UpdateDonaciones_Viveres } from './donaciones_viveres.dto';

@Injectable()
export class DonacionesViveresService {
    constructor(
        @InjectRepository(DonacionesViveres)
        private readonly Donaciones_ViveresRepository: Repository<DonacionesViveres>,
    ) { }
    findAll(): Promise<DonacionesViveres[]> {
        return this.Donaciones_ViveresRepository.find();
    }

    async getDonaciones_Viveres(id: number): Promise<DonacionesViveres | string | null> {
        const DonacionesViveres = await this.Donaciones_ViveresRepository.findOneBy({ id });

        if (DonacionesViveres != null) {
            return DonacionesViveres;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createDonaciones_Viveres(createDonaciones_ViveresDto: CreateDonaciones_ViveresDto): Promise<DonacionesViveres> {
        const DonacionesViveres = await this.Donaciones_ViveresRepository.create(createDonaciones_ViveresDto);
        
        return this.Donaciones_ViveresRepository.save(DonacionesViveres);
    }
    async updateDonaciones_Viveres(updateDonaciones_Viveres: UpdateDonaciones_Viveres): Promise<DonacionesViveres> {
        const DonacionesViveres = await this.Donaciones_ViveresRepository.findOne({
            where: { id: updateDonaciones_Viveres.id },
        });

        if (!DonacionesViveres) {
            throw new Error('Donaciones Viveres no encontrado');
        }

        this.Donaciones_ViveresRepository.merge(DonacionesViveres, updateDonaciones_Viveres);
        return this.Donaciones_ViveresRepository.save(DonacionesViveres);
    }

    async deleteDonaciones_Viveres(id: number): Promise<void> {
        await this.Donaciones_ViveresRepository.delete(id);
    }
}
