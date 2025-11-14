import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingreso } from './ingreso.entity';
import { CreateIngresoDto, UpdateIngresoDto } from './ingreso.dto';
import { Protectora } from 'src/protectora/protectora.entity';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(Ingreso)
    private readonly ingresoRepository: Repository<Ingreso>,

    @InjectRepository(Protectora)
    private readonly protectoraRepository: Repository<Protectora>,
  ) {}

  findAll(): Promise<Ingreso[]> {
    return this.ingresoRepository.find({ relations: ['protectora'] });
  }

  async getIngreso(id_ingreso: number): Promise<Ingreso> {
    const ingreso = await this.ingresoRepository.findOne({
      where: { id_ingreso },
      relations: ['protectora'],
    });

    if (!ingreso) {
      throw new HttpException('Ingreso no encontrado', HttpStatus.NOT_FOUND);
    }

    return ingreso;
  }

  async createIngreso(createIngresoDto: CreateIngresoDto): Promise<Ingreso> {
    const { protectora, ...rest } = createIngresoDto;

    // Verificar que la protectora existe
    const protectoraEntity = await this.protectoraRepository.findOneBy({
      id_protectora: protectora,
    });
    if (!protectoraEntity) {
      throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
    }

    const ingreso = this.ingresoRepository.create({
      ...rest,
      protectora: protectoraEntity,
    });

    return this.ingresoRepository.save(ingreso);
  }

  async updateIngreso(updateIngresoDto: UpdateIngresoDto): Promise<Ingreso> {
    const ingreso = await this.ingresoRepository.findOne({
      where: { id_ingreso: updateIngresoDto.id_ingreso },
      relations: ['protectora'],
    });

    if (!ingreso) {
      throw new HttpException('Ingreso no encontrado', HttpStatus.NOT_FOUND);
    }

    // Actualizar protectora si se proporciona
    if (updateIngresoDto.protectora !== undefined) {
      const protectora = await this.protectoraRepository.findOneBy({
        id_protectora: updateIngresoDto.protectora,
      });
      if (!protectora) {
        throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
      }
      ingreso.protectora = protectora;
    }

    const camposSimples = {
      fecha: updateIngresoDto.fecha,
      tipo: updateIngresoDto.tipo,
      cantidad: updateIngresoDto.cantidad,
    };

    this.ingresoRepository.merge(ingreso, camposSimples);
    return this.ingresoRepository.save(ingreso);
  }

  async deleteIngreso(id_ingreso: number): Promise<void> {
    const ingreso = await this.ingresoRepository.findOneBy({ id_ingreso });

    if (!ingreso) {
      throw new HttpException('Ingreso no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.ingresoRepository.delete(id_ingreso);
  }
}
