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

    if (typeof createIngresoDto.tipo !== 'string') {
        throw new HttpException('El tipo de ingreso debe ser texto', HttpStatus.BAD_REQUEST);
    }

    if (typeof createIngresoDto.cantidad !== 'number') {
        throw new HttpException('La cantidad debe ser un número', HttpStatus.BAD_REQUEST);
    }
    
    if (typeof createIngresoDto.fecha !== 'string' && !(createIngresoDto.fecha instanceof Date)) {
        throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
    }else if (typeof createIngresoDto.fecha === 'string') {
      if (isNaN(Date.parse(createIngresoDto.fecha))) {
        throw new HttpException(
          'La fecha debe tener formato válido YYYY-MM-DD',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    
    if (typeof createIngresoDto.protectora !== 'number') {
        throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
    }

    // Verificar que la protectora existe
    const protectora = await this.protectoraRepository.findOneBy({ id_protectora: createIngresoDto.protectora });
    if (!protectora) {
        throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
    }

    const ingreso = this.ingresoRepository.create({
      ...createIngresoDto,
      protectora,
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

    if (updateIngresoDto.tipo !== undefined && typeof updateIngresoDto.tipo !== 'string') {
        throw new HttpException('El tipo de ingreso debe ser texto', HttpStatus.BAD_REQUEST);
    }

    if (updateIngresoDto.cantidad !== undefined && typeof updateIngresoDto.cantidad !== 'number') {
        throw new HttpException('La cantidad debe ser un número', HttpStatus.BAD_REQUEST);
    }
    
    if (updateIngresoDto.fecha !== undefined &&
        typeof updateIngresoDto.fecha !== 'string' &&
        !(updateIngresoDto.fecha instanceof Date)) {
        throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
    }else if (typeof updateIngresoDto.fecha === 'string') {
      if (isNaN(Date.parse(updateIngresoDto.fecha))) {
        throw new HttpException(
          'La fecha debe tener formato válido YYYY-MM-DD',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    
    if (updateIngresoDto.protectora !== undefined && typeof updateIngresoDto.protectora !== 'number') {
        throw new HttpException('El ID de la protectora debe ser un número', HttpStatus.BAD_REQUEST);
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
