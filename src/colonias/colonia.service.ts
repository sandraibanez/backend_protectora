import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colonia } from './colonia.entity';
import { Repository } from 'typeorm';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';
import { Protectora } from 'src/protectora/protectora.entity';

@Injectable()
export class ColoniaService {
    constructor(
        @InjectRepository(Colonia)
        private readonly coloniaRepository: Repository<Colonia>,

        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,
    ) {}

    findAll(): Promise<Colonia[]> {
        return this.coloniaRepository.find({
            relations: ['protectora'], 
        });
    }

    async getColonia(id_colonia: number): Promise<Colonia> {
        const colonia = await this.coloniaRepository.findOne({
            where: { id_colonia },
            relations: ['protectora'], 
        });

        if (!colonia) {
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
        }
        return colonia;
    }

    async createColonia(createColoniaDto: CreateColoniaDto): Promise<Colonia> {

        // Validar protectora
        const protectora = await this.protectoraRepository.findOneBy({ id_protectora: createColoniaDto.protectora });
        if (!protectora) {
            throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
        }

        const colonia = this.coloniaRepository.create({ 
            ...createColoniaDto,
            protectora, 
        });

        return this.coloniaRepository.save(colonia);
    }

    async updateColonia(id_colonia: number, updateColoniaDto: UpdateColoniaDto): Promise<Colonia> {
        const colonia = await this.coloniaRepository.findOne({
            where: { id_colonia: id_colonia },
            relations: ['protectora'],
        });

        if (!colonia) {
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
        }

        // Actualizar protectora si se proporciona
        if (updateColoniaDto.protectora !== undefined) {
            const protectora = await this.protectoraRepository.findOneBy({ id_protectora: updateColoniaDto.protectora });
            if (!protectora) {
                throw new HttpException('Protectora no encontrada', HttpStatus.BAD_REQUEST);
            }
            colonia.protectora = protectora;
        }

        const camposSimples = {
            localizacion: updateColoniaDto.localizacion,
            conteo_gatos: updateColoniaDto.conteo_gatos,
            foto: updateColoniaDto.foto,
            horario_alimento: updateColoniaDto.horario_alimento,
            cantidad_comida: updateColoniaDto.cantidad_comida,
        };
        
        this.coloniaRepository.merge(colonia, camposSimples);

        return this.coloniaRepository.save(colonia);
    }


    async deleteColonia(id_colonia: number): Promise<void> {

        const colonia = await this.coloniaRepository.findOneBy({ id_colonia: id_colonia });

        if (!colonia) {
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
        }

        // Eliminar el animal
        await this.coloniaRepository.delete(id_colonia);
    }
}
