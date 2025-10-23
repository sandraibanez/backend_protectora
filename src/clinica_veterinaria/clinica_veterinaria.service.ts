import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinica_veterinaria } from './clinica_veterinaria.entity';
import { Repository } from 'typeorm';
import { CreateClinica_VeterinariaDto, UpdateClinica_Veterinaria } from './clinica_veterinaria.dto';

@Injectable()
export class ClinicaVeterinariaService {
    constructor(
        @InjectRepository(Clinica_veterinaria)
        private readonly clinica_veterinariaRepository: Repository<Clinica_veterinaria>,
    ) { }
    findAll(): Promise<Clinica_veterinaria[]> {
        return this.clinica_veterinariaRepository.find();
    }

    async getClinica_Veterinaria(id: number): Promise<Clinica_veterinaria | string | null> {
        const clinica_veterinaria = await this.clinica_veterinariaRepository.findOneBy({ id });

        if (clinica_veterinaria != null) {
            return clinica_veterinaria;
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
    async createClinica_Veterinaria(createclinica_veterinarialDto: CreateClinica_VeterinariaDto): Promise<Clinica_veterinaria> {
        const clinica_veterinaria = await this.clinica_veterinariaRepository.create(createclinica_veterinarialDto);
        // const passwordHash = await bcrypt.hash(await usuario.password, 10); 
        // usuario.password = passwordHash;
        return this.clinica_veterinariaRepository.save(clinica_veterinaria);
    }
    async updateClinica_Veterinaria(UpdateClinica_Veterinaria: UpdateClinica_Veterinaria): Promise<Clinica_veterinaria> {
        const clinica_veterinaria = await this.clinica_veterinariaRepository.findOne({
            where: { id: UpdateClinica_Veterinaria.id },
        });

        if (!clinica_veterinaria) {
            throw new Error('clinica_veterinaria no encontrado');
        }

        this.clinica_veterinariaRepository.merge(clinica_veterinaria, UpdateClinica_Veterinaria);
        return this.clinica_veterinariaRepository.save(clinica_veterinaria);
    }

    async deleteClinica_Veterinaria(id: number): Promise<void> {
        await this.clinica_veterinariaRepository.delete(id);
    }
}
