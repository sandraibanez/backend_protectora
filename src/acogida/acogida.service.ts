import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acogida, EstadoAcogida } from './acogida.entity';
import { CreateAcogidaDto, UpdateAcogidaDto } from './acogida.dto';
import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class AcogidaService {
  constructor(
    @InjectRepository(Acogida)
    private readonly acogidaRepository: Repository<Acogida>,

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Busca un animal por su ID incluyendo su protectora,
  async getAcogida(id_animal: number) {
    return this.animalRepository.findOne({
      where: { id_animal },
      relations: ['protectora']
    });
  }


  // Crear solicitud de acogida
  async create(dto: CreateAcogidaDto): Promise<Acogida> {
    const animal = await this.animalRepository.findOne({ where: { id_animal: dto.id_animal } });
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    const usuario = await this.userRepository.findOne({ where: { id_user: dto.id_user } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Un animal no puede tener dos acogidas activas
    const acogidaActiva = await this.acogidaRepository.findOne({
      where: {
        animal: { id_animal: dto.id_animal },
        estado: EstadoAcogida.ACEPTADA,
      },
    });

    if (acogidaActiva) {
      throw new HttpException(
        'Este animal ya tiene una acogida activa',
        HttpStatus.CONFLICT,
      );
    }

    const nueva = this.acogidaRepository.create({
      fecha_solicitud: dto.fecha_solicitud,
      estado: dto.estado ?? EstadoAcogida.PENDIENTE,
      observaciones: dto.observaciones,
      animal,
      usuario,
    });

    return this.acogidaRepository.save(nueva);
  }

  // Obtener todas las acogidas
  async findAll(): Promise<Acogida[]> {
    return this.acogidaRepository.find({
      relations: ['animal', 'usuario'],
    });
  }

  // Obtener acogidas por Animal
  async findByAnimal(idAnimal: number): Promise<Acogida[]> {
    const animal = await this.animalRepository.findOne({
      where: { id_animal: idAnimal },
    });

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.acogidaRepository.find({
      where: { animal: { id_animal: idAnimal } },
      relations: ['animal', 'usuario'],
      order: { fecha_solicitud: 'DESC' }
    });
  }

  // Obtener todas las acogidas realizadas por un usuario
  async findByUsuario(id_user: number): Promise<Acogida[]> {
    const usuario = await this.userRepository.findOne({
      where: { id_user: id_user },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.acogidaRepository.find({
      where: { usuario: { id_user: id_user } },
      relations: ['animal', 'usuario'],
      order: { fecha_solicitud: 'DESC' }
    });
  }


  // Obtener acogida por ID
  async findOne(id: number): Promise<Acogida> {
    const acogida = await this.acogidaRepository.findOne({
      where: { id_acogida: id },
      relations: ['animal', 'usuario'],
    });

    if (!acogida) {
      throw new HttpException('Acogida no encontrada', HttpStatus.NOT_FOUND);
    }

    return acogida;
  }

  // Actualizar acogida
  async update(id: number, dto: UpdateAcogidaDto): Promise<Acogida> {
    const acogida = await this.findOne(id);

    if (dto.id_animal) {
      const animal = await this.animalRepository.findOne({ where: { id_animal: dto.id_animal } });
      if (!animal) throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
      acogida.animal = animal;
    }

    if (dto.id_user) {
      const usuario = await this.userRepository.findOne({ where: { id_user: dto.id_user } });
      if (!usuario) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      acogida.usuario = usuario;
    }

    Object.assign(acogida, dto);

    return this.acogidaRepository.save(acogida);
  }

  // Eliminar acogida
  async delete(id: number): Promise<void> {
    const acogida = await this.findOne(id);
    await this.acogidaRepository.remove(acogida);
  }
}
