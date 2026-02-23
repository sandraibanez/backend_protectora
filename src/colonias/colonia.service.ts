import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colonia } from './colonia.entity';
import { Repository } from 'typeorm';
import { CreateColoniaDto, UpdateColoniaDto } from './colonia.dto';
import { Protectora } from 'src/protectora/protectora.entity';
import { Animal } from 'src/animal/animal.entity';

// Interfaz para respuesta con conteos calculados
export interface ColoniaConConteos extends Colonia {
    conteo_gatos: number;
    conteo_castrados: number;
}

@Injectable()
export class ColoniaService {
    constructor(
        @InjectRepository(Colonia)
        private readonly coloniaRepository: Repository<Colonia>,

        @InjectRepository(Protectora)
        private readonly protectoraRepository: Repository<Protectora>,

        @InjectRepository(Animal)
        private readonly animalRepository: Repository<Animal>,
    ) {}

    // Método auxiliar para calcular conteos de una colonia
    private async calcularConteos(colonia: Colonia): Promise<ColoniaConConteos> {
        const totalAnimales = await this.animalRepository.count({
            where: { colonia: { id_colonia: colonia.id_colonia } },
        });

        const totalCastrados = await this.animalRepository.count({
            where: { 
                colonia: { id_colonia: colonia.id_colonia },
                esterilizado: true,
            },
        });

        return {
            ...colonia,
            conteo_gatos: totalAnimales,
            conteo_castrados: totalCastrados,
        };
    }

    async findAll(): Promise<ColoniaConConteos[]> {
        const colonias = await this.coloniaRepository.find({
            relations: ['protectora'], 
        });

        // Calcular conteos para cada colonia
        return Promise.all(colonias.map(colonia => this.calcularConteos(colonia)));
    }

    async findLimitedByProtectora(id_protectora: number): Promise<ColoniaConConteos[]> {
        const colonias = await this.coloniaRepository.find({
            where: { protectora: { id_protectora: id_protectora } },
            relations: ['protectora'],
        });

        // Calcular conteos para cada colonia
        return Promise.all(colonias.map(colonia => this.calcularConteos(colonia)));
    }

    async findLimitedByProtectoraAndId(id_protectora: number, idColonia: number): Promise<ColoniaConConteos> {
        const colonia = await this.coloniaRepository.findOne({
            where: {
                id_colonia: idColonia,
                protectora: { id_protectora: id_protectora },
            },
            relations: ['protectora'],
        });

        if (!colonia) {
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
        }

        return this.calcularConteos(colonia);
    }


    async getColonia(id_colonia: number): Promise<ColoniaConConteos> {
        const colonia = await this.coloniaRepository.findOne({
            where: { id_colonia },
            relations: ['protectora'], 
        });

        if (!colonia) {
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND);
        }

        return this.calcularConteos(colonia);
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
            latitud: updateColoniaDto.latitud,
            longitud: updateColoniaDto.longitud
        };
        
        this.coloniaRepository.merge(colonia, camposSimples);

        return this.coloniaRepository.save(colonia);
    }

    // Asignar animal a una colonia 
    async asignarAnimal(idColonia: number, idAnimal: number): Promise<Animal> { 
        const colonia = await this.coloniaRepository.findOne({ 
            where: { id_colonia: idColonia }, relations: ['protectora'], 
        }); 
        if (!colonia) { 
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND); 
        } 
        const animal = await this.animalRepository.findOne({ 
            where: { id_animal: idAnimal }, 
            relations: ['protectora'], 
        }); 
        if (!animal) { 
            throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND); 
        } 
        // Asignar colonia al animal 
        animal.colonia = colonia; 
        return this.animalRepository.save(animal); 
    }

    // Contar animales castrados en una colonia 
    async contarCastrados(idColonia: number): Promise<number> { 
        const colonia = await this.coloniaRepository.findOne({ 
            where: { id_colonia: idColonia }, 
        }); 
        if (!colonia) { 
            throw new HttpException('Colonia no encontrada', HttpStatus.NOT_FOUND); 
        } 
        const count = await this.animalRepository.count({ 
            where: { colonia: { id_colonia: idColonia }, esterilizado: true, }, 
        }); 
        return count; 
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
