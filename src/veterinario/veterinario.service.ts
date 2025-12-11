import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Veterinario } from './veterinario.entity';
import { Protectora } from 'src/protectora/protectora.entity';
import { CreateVeterinarioDto, UpdateVeterinarioDto } from './veterinario.dto';

@Injectable()
export class VeterinarioService {
  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,

    @InjectRepository(Protectora)
    private readonly protectoraRepository: Repository<Protectora>,
  ) {}

  // Obtener todos los veterinarios
  findAll(): Promise<Veterinario[]> {
    return this.veterinarioRepository.find({
      relations: ['protectoras'],
    });
  }

  // Obtener un veterinario por ID
  async getVeterinario(id_veterinario: number): Promise<Veterinario> {
    const veterinario = await this.veterinarioRepository.findOne({
      where: { id_veterinario },
      relations: ['protectoras'],
    });

    if (!veterinario) {
      throw new HttpException('Veterinario no encontrado', HttpStatus.NOT_FOUND);
    }
    return veterinario;
  }

  // Crear veterinario
  async createVeterinario(createVeterinarioDto: CreateVeterinarioDto): Promise<Veterinario> {

    let protectoras: Protectora[] = [];
    if (createVeterinarioDto.protectoras && createVeterinarioDto.protectoras.length > 0) {
        protectoras = await this.protectoraRepository.findBy({ id_protectora: In(createVeterinarioDto.protectoras) });
        if (protectoras.length !== createVeterinarioDto.protectoras.length) {
            throw new HttpException('Algúna protectoras no existe', HttpStatus.BAD_REQUEST);
        }
    }

    const veterinario = this.veterinarioRepository.create({
        ...createVeterinarioDto,
        protectoras,
    });

        return this.veterinarioRepository.save(veterinario);
  }
  
  async updateVeterinario(updateVeterinarioDto: UpdateVeterinarioDto): Promise<Veterinario> {
    const veterinario = await this.veterinarioRepository.findOne({
      where: { id_veterinario: updateVeterinarioDto.id_veterinario },
      relations: ['protectoras'],
    });

    if (!veterinario) {
      throw new HttpException('Veterinario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Actualizar relaciones de protectoras
    if (updateVeterinarioDto.protectoras) {
      const protectoras = await this.protectoraRepository.findBy({
        id_protectora: In(updateVeterinarioDto.protectoras),
      });

      if (protectoras.length !== updateVeterinarioDto.protectoras.length) {
        throw new HttpException('Alguna protectora no existe', HttpStatus.BAD_REQUEST);
      }

      veterinario.protectoras = protectoras;
    }

    // Actualizar campos simples
    const camposSimples = {
        nombre: updateVeterinarioDto.nombre,
        direccion: updateVeterinarioDto.direccion,
        telefono: updateVeterinarioDto.telefono,
    };
    this.veterinarioRepository.merge(veterinario, camposSimples);

    return this.veterinarioRepository.save(veterinario);
  }

  // Eliminar veterinario
  async deleteVeterinario(id_veterinario: number): Promise<void> {
    const veterinario = await this.veterinarioRepository.findOneBy({ id_veterinario });

    if (!veterinario) {
      throw new HttpException('Veterinario no encontrado', HttpStatus.NOT_FOUND);
    }
    await this.veterinarioRepository.delete(id_veterinario);
  }
}
