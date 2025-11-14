import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasto } from './gasto.entity';
import { CreateGastoDto, UpdateGastoDto } from './gasto.dto';
import { Protectora } from 'src/protectora/protectora.entity';

@Injectable()
export class GastoService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastoRepository: Repository<Gasto>,

    @InjectRepository(Protectora)
    private readonly protectoraRepository: Repository<Protectora>,
  ) {}

  findAll(): Promise<Gasto[]> {
    return this.gastoRepository.find({ relations: ['protectora'] });
  }

  async getGasto(id_gasto: number): Promise<Gasto> {
    const gasto = await this.gastoRepository.findOne({
      where: { id_gasto },
      relations: ['protectora'],
    });

    if (!gasto) {
      throw new HttpException('Gasto no encontrado', HttpStatus.NOT_FOUND);
    }

    return gasto;
  }

  async createGasto(createGastoDto: CreateGastoDto): Promise<Gasto> {
    const { protectora, ...rest } = createGastoDto;

    // Verificar que la protectora existe
    const protectoraEntity = await this.protectoraRepository.findOneBy({
      id_protectora: protectora,
    });
    if (!protectoraEntity) {
      throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
    }

    const gasto = this.gastoRepository.create({
      ...rest,
      protectora: protectoraEntity,
    });

    return this.gastoRepository.save(gasto);
  }

  async updateGasto(updateGastoDto: UpdateGastoDto): Promise<Gasto> {
        const gasto = await this.gastoRepository.findOne({
            where: { id_gasto: updateGastoDto.id_gasto },
            relations: ['protectora'],
        });

        if (!gasto) {
            throw new HttpException('Gasto no encontrado', HttpStatus.NOT_FOUND);
        }

    // Actualizar protectora si se proporciona
        if (updateGastoDto.protectora !== undefined) {
            const protectora = await this.protectoraRepository.findOneBy({ id_protectora: updateGastoDto.protectora });
            if (!protectora) {
                throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
            }
            gasto.protectora = protectora;
        }
        const camposSimples = {
            fecha: updateGastoDto.fecha,
            tipo: updateGastoDto.tipo,
            cantidad: updateGastoDto.cantidad
        };
        
        this.gastoRepository.merge(gasto, camposSimples);
        return this.gastoRepository.save(gasto);
    }
    
  

  async deleteGasto(id_gasto: number): Promise<void> {
    const gasto = await this.gastoRepository.findOneBy({ id_gasto });

    if (!gasto) {
      throw new HttpException('Gasto no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.gastoRepository.delete(id_gasto);
  }
}
