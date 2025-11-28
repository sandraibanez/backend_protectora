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

        if (typeof createDonacionesViveresDto.tipo !== 'string') {
            throw new HttpException('El tipo de víveres debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (typeof createDonacionesViveresDto.cantidad !== 'number') {
            throw new HttpException('La cantidad debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createDonacionesViveresDto.lugar !== 'string') {
            throw new HttpException('El lugar debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (typeof createDonacionesViveresDto.fecha !== 'string' && !(createDonacionesViveresDto.fecha instanceof Date)) {
            throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof createDonacionesViveresDto.fecha === 'string') {
            if (isNaN(Date.parse(createDonacionesViveresDto.fecha))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        
        if (typeof createDonacionesViveresDto.protectora !== 'number') {
            throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
        }

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

        if (updateDonacionesViveresDto.tipo !== undefined && typeof updateDonacionesViveresDto.tipo !== 'string') {
            throw new HttpException('El tipo de víveres debe ser texto', HttpStatus.BAD_REQUEST);
        }

        if (updateDonacionesViveresDto.cantidad !== undefined && typeof updateDonacionesViveresDto.cantidad !== 'number') {
            throw new HttpException('La cantidad debe ser un número', HttpStatus.BAD_REQUEST);
        }
        
        if (updateDonacionesViveresDto.lugar !== undefined && typeof updateDonacionesViveresDto.lugar !== 'string') {
            throw new HttpException('El lugar debe ser texto', HttpStatus.BAD_REQUEST);
        }
        
        if (updateDonacionesViveresDto.fecha !== undefined &&
            typeof updateDonacionesViveresDto.fecha !== 'string' &&
            !(updateDonacionesViveresDto.fecha instanceof Date)) {
            throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
        }else if (typeof updateDonacionesViveresDto.fecha === 'string') {
            if (isNaN(Date.parse(updateDonacionesViveresDto.fecha))) {
                throw new HttpException(
                    'La fecha debe tener formato válido YYYY-MM-DD',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        
        if (updateDonacionesViveresDto.protectora !== undefined && typeof updateDonacionesViveresDto.protectora !== 'number') {
            throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
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
