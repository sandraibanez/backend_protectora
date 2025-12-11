import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonacionesViveres } from './donaciones_viveres.entity';
import { Repository } from 'typeorm';
import { CreateDonacionesViveresDto, UpdateDonacionesViveresDto } from './donaciones_viveres.dto';
import { Protectora } from 'src/protectora/protectora.entity';

@Injectable()
export class DonacionesViveresService {
    constructor(
        @InjectRepository(DonacionesViveres)
        private readonly donacionesRepository: Repository<DonacionesViveres>,

        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,
    ) {}

    findAll(): Promise<DonacionesViveres[]> {
        return this.donacionesRepository.find({
            relations: ['protectora'], 
        });
    }

    async getDonacionesViveres(id_donacion: number): Promise<DonacionesViveres> {
        const donacion = await this.donacionesRepository.findOne({
            where: { id_donacion },
            relations: ['protectora'], 
        });

        if (!donacion) {
            throw new HttpException('Donación no encontrada', HttpStatus.NOT_FOUND);
        }
        return donacion;
    }

    async createDonacionesViveres(createDonacionesViveresDto: CreateDonacionesViveresDto): Promise<DonacionesViveres> {

        // Validar protectora
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: createDonacionesViveresDto.protectora });
        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
        }

        const donacion = this.donacionesRepository.create({ 
            ...createDonacionesViveresDto,
            protectora, 
        });

        return this.donacionesRepository.save(donacion);
    }

    async updateDonacionesViveres(updateDonacionesViveresDto: UpdateDonacionesViveresDto): Promise<DonacionesViveres> {
        const donacion = await this.donacionesRepository.findOne({
            where: { id_donacion: updateDonacionesViveresDto.id_donacion },
            relations: ['protectora'],
        });

        if (!donacion) {
            throw new HttpException('Donación no encontrada', HttpStatus.NOT_FOUND);
        }

        // Actualizar protectora si se proporciona
        if (updateDonacionesViveresDto.protectora !== undefined) {
            const protectora = await this.protectoraRepository.findOneBy({ id_protectora: updateDonacionesViveresDto.protectora });
            if (!protectora) {
                throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
            }
            donacion.protectora = protectora;
        }

        // Merge solo los campos simples
        const camposSimples = {
            fecha: updateDonacionesViveresDto.fecha,
            tipo: updateDonacionesViveresDto.tipo,
            cantidad: updateDonacionesViveresDto.cantidad,
            lugar: updateDonacionesViveresDto.lugar,
        };
        this.donacionesRepository.merge(donacion, camposSimples);

        return this.donacionesRepository.save(donacion);
    }

    async deleteDonacionesViveres(id_donacion: number): Promise<void> {
      const donacion = await this.donacionesRepository.findOneBy({ id_donacion });
      if (!donacion) {
          throw new HttpException('Donación no encontrada', HttpStatus.NOT_FOUND);
      }
      await this.donacionesRepository.delete(id_donacion);
  }

}
