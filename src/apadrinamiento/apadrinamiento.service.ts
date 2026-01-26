import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apadrinamiento } from './apadrinamiento.entity';
import { CreateApadrinamientoDto, UpdateApadrinamientoDto } from './apadrinamiento.dto';

import { Animal } from 'src/animal/animal.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ApadrinamientoService {
  constructor(
    @InjectRepository(Apadrinamiento)
    private readonly apadrinamientoRepository: Repository<Apadrinamiento>,

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear apadrinamiento
  async create(dto: CreateApadrinamientoDto): Promise<Apadrinamiento> {
    const animal = await this.animalRepository.findOne({ where: { id_animal: dto.id_animal } });
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    const usuario = await this.userRepository.findOne({ where: { id_user: dto.id_usuario } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Un usuario no puede apadrinar dos veces el mismo animal
    const yaApadrinado = await this.apadrinamientoRepository.findOne({
      where: {
        animal: { id_animal: dto.id_animal },
        usuario: { id_user: dto.id_usuario },
        activo: true,
      },
    });

    if (yaApadrinado) {
      throw new HttpException(
        'Este usuario ya apadrina este animal',
        HttpStatus.CONFLICT,
      );
    }

    const nuevo = this.apadrinamientoRepository.create({
      fecha_inicio: dto.fecha_inicio,
      activo: dto.activo,
      animal,
      usuario,
    });

    return this.apadrinamientoRepository.save(nuevo);
  }

  // Obtener todos los apadrinamientos
  async findAll(): Promise<Apadrinamiento[]> {
    return this.apadrinamientoRepository.find({
      relations: ['animal', 'usuario'],
    });
  }
  // Obtener todos los apadrinamientos de un animal
  async findByAnimal(idAnimal: number): Promise<Apadrinamiento[]> {
    const animal = await this.animalRepository.findOne({
      where: { id_animal: idAnimal },
    });

    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.apadrinamientoRepository.find({
      where: { animal: { id_animal: idAnimal } },
      relations: ['animal', 'usuario'],
      order: { fecha_inicio: 'DESC' }
    });
  }

  // Obtener todos los apadrinamientos realizados por un usuario
  async findByUsuario(idUsuario: number): Promise<Apadrinamiento[]> {
    const usuario = await this.userRepository.findOne({
      where: { id_user: idUsuario },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.apadrinamientoRepository.find({
      where: { usuario: { id_user: idUsuario } },
      relations: ['animal', 'usuario'],
      order: { fecha_inicio: 'DESC' }
    });
  }



  // Obtener apadrinamiento por ID
  async findOne(id: number): Promise<Apadrinamiento> {
    const apadrinamiento = await this.apadrinamientoRepository.findOne({
      where: { id_apadrinamiento: id },
      relations: ['animal', 'usuario'],
    });

    if (!apadrinamiento) {
      throw new HttpException('Apadrinamiento no encontrado', HttpStatus.NOT_FOUND);
    }

    return apadrinamiento;
  }

  // Actualizar apadrinamiento
  async update(id: number, dto: UpdateApadrinamientoDto): Promise<Apadrinamiento> {
    const apadrinamiento = await this.findOne(id);

    if (dto.id_animal) {
      const animal = await this.animalRepository.findOne({ where: { id_animal: dto.id_animal } });
      if (!animal) throw new HttpException('Animal no encontrado', HttpStatus.NOT_FOUND);
      apadrinamiento.animal = animal;
    }

    if (dto.id_usuario) {
      const usuario = await this.userRepository.findOne({ where: { id_user: dto.id_usuario } });
      if (!usuario) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      apadrinamiento.usuario = usuario;
    }

    Object.assign(apadrinamiento, dto);

    return this.apadrinamientoRepository.save(apadrinamiento);
  }

  // Eliminar apadrinamiento
  async delete(id: number): Promise<void> {
    const apadrinamiento = await this.findOne(id);
    await this.apadrinamientoRepository.remove(apadrinamiento);
  }
}
