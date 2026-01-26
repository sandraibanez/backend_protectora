import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultaMedicacion } from './consulta_medicacion.entity';
import { CreateConsultaMedicacionDto, UpdateConsultaMedicacionDto } from './consulta_medicacion.dto';
import { AnimalVeterinario } from 'src/animal_veterinario/animal_veterinario.entity';
import { Medicacion } from 'src/medicacion/medicacion.entity';

@Injectable()
export class ConsultaMedicacionService {
    constructor(
        @InjectRepository(ConsultaMedicacion)
        private readonly consultaMedicacionRepository: Repository<ConsultaMedicacion>,

        @InjectRepository(AnimalVeterinario)
        private readonly animalVeterinarioRepository: Repository<AnimalVeterinario>,

        @InjectRepository(Medicacion)
        private readonly medicacionRepository: Repository<Medicacion>,
    ) {}

    // -----------------------------------------------------
    // GET ALL
    // -----------------------------------------------------
    findAll(): Promise<ConsultaMedicacion[]> {
        return this.consultaMedicacionRepository.find({
            relations: ['consulta', 'medicacion'],
        });
    }

    // -----------------------------------------------------
    // GET ONE
    // -----------------------------------------------------
    async getConsultaMedicacion(id_consulta_medicacion: number): Promise<ConsultaMedicacion> {
        const registro = await this.consultaMedicacionRepository.findOne({
            where: { id_consulta_medicacion },
            relations: ['consulta', 'medicacion'],
        });

        if (!registro) {
            throw new HttpException('Registro de medicación no encontrado', HttpStatus.NOT_FOUND);
        }

        return registro;
    }

    // -----------------------------------------------------
    // CREATE
    // -----------------------------------------------------
    async createConsultaMedicacion(dto: CreateConsultaMedicacionDto): Promise<ConsultaMedicacion> {

        // Validar consulta
        const consulta = await this.animalVeterinarioRepository.findOneBy({ id_animalVeterinario: dto.consulta });
        if (!consulta) {
            throw new HttpException('Consulta no encontrada', HttpStatus.BAD_REQUEST);
        }

        // Validar medicación
        const medicacion = await this.medicacionRepository.findOneBy({ id_medicacion: dto.medicacion });
        if (!medicacion) {
            throw new HttpException('Medicamento no encontrado', HttpStatus.BAD_REQUEST);
        }

        // Crear registro
        const registro = this.consultaMedicacionRepository.create({
            ...dto,
            consulta,
            medicacion,
        });

        return this.consultaMedicacionRepository.save(registro);
    }

    // -----------------------------------------------------
    // UPDATE
    // -----------------------------------------------------
    async updateConsultaMedicacion(id_consulta_medicacion: number, dto: UpdateConsultaMedicacionDto): Promise<ConsultaMedicacion> {
        const registro = await this.consultaMedicacionRepository.findOne({
            where: { id_consulta_medicacion: id_consulta_medicacion },
            relations: ['consulta', 'medicacion'],
        });

        if (!registro) {
            throw new HttpException('Registro de medicación no encontrado', HttpStatus.NOT_FOUND);
        }

        // Actualizar consulta si viene
        if (dto.consulta !== undefined) {
            const consulta = await this.animalVeterinarioRepository.findOneBy({ id_animalVeterinario: dto.consulta });
            if (!consulta) {
                throw new HttpException('Consulta no encontrada', HttpStatus.BAD_REQUEST);
            }
            registro.consulta = consulta;
        }

        // Actualizar medicación si viene
        if (dto.medicacion !== undefined) {
            const medicacion = await this.medicacionRepository.findOneBy({ id_medicacion: dto.medicacion });
            if (!medicacion) {
                throw new HttpException('Medicamento no encontrado', HttpStatus.BAD_REQUEST);
            }
            registro.medicacion = medicacion;
        }

        // Merge de campos simples
        const camposSimples = {
            dosis: dto.dosis,
            f_inicio: dto.f_inicio,
            f_fin: dto.f_fin,
            notas: dto.notas,
        };

        this.consultaMedicacionRepository.merge(registro, camposSimples);

        return this.consultaMedicacionRepository.save(registro);
    }

    // -----------------------------------------------------
    // DELETE
    // -----------------------------------------------------
    async deleteConsultaMedicacion(id_consulta_medicacion: number): Promise<void> {
        const registro = await this.consultaMedicacionRepository.findOneBy({ id_consulta_medicacion });

        if (!registro) {
            throw new HttpException('Registro de medicación no encontrado', HttpStatus.NOT_FOUND);
        }

        await this.consultaMedicacionRepository.delete(id_consulta_medicacion);
    }
}
