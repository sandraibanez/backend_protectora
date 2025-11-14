import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelacionPersonaAnimal } from './relacion_persona_animal.entity';
import { CreateRelacionPersonaAnimalDto, UpdateRelacionPersonaAnimalDto } from './relacion_persona_animal.dto';
import { User } from 'src/user/user.entity';
import { Animal } from 'src/animal/animal.entity';

@Injectable()
export class RelacionPersonaAnimalService {
  constructor(
    @InjectRepository(RelacionPersonaAnimal)
    private readonly relacionRepository: Repository<RelacionPersonaAnimal>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  findAll(): Promise<RelacionPersonaAnimal[]> {
    return this.relacionRepository.find({
      relations: ['persona', 'animal'],
    });
  }

  async getRelacion(id_relacion: number): Promise<RelacionPersonaAnimal> {
    const relacion = await this.relacionRepository.findOne({
      where: { id_relacion },
      relations: ['persona', 'animal'],
    });

    if (!relacion) {
      throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
    }

    return relacion;
  }

  async createRelacion(createDto: CreateRelacionPersonaAnimalDto): Promise<RelacionPersonaAnimal> {
    const persona = await this.userRepository.findOneBy({ id_user: createDto.persona });
    if (!persona) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }

    const animal = await this.animalRepository.findOneBy({ id_animal: createDto.animal });
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST);
    }

    const relacion = this.relacionRepository.create({
      fecha: new Date(createDto.fecha),
      accion: createDto.accion,
      persona,
      animal,
    });

    return this.relacionRepository.save(relacion);
  }

  async updateRelacion(updateDto: UpdateRelacionPersonaAnimalDto): Promise<RelacionPersonaAnimal> {
    const relacion = await this.relacionRepository.findOne({
      where: { id_relacion: updateDto.id_relacion },
      relations: ['persona', 'animal'],
    });

    if (!relacion) {
      throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
    }

    // Actualizar las relaciones si se pasan nuevos IDs
    if (updateDto.persona !== undefined) {
      const persona = await this.userRepository.findOneBy({ id_user: updateDto.persona });
      if (!persona) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      relacion.persona = persona;
    }

    if (updateDto.animal !== undefined) {
      const animal = await this.animalRepository.findOneBy({ id_animal: updateDto.animal });
      if (!animal) {
        throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST);
      }
      relacion.animal = animal;
    }

    const camposSimples = this.relacionRepository.create({
      fecha: updateDto.fecha,
      accion: updateDto.accion,
    });


    this.relacionRepository.merge(relacion, camposSimples);

    return this.relacionRepository.save(relacion);
  }

  async deleteRelacion(id_relacion: number): Promise<void> {
    const relacion = await this.relacionRepository.findOneBy({ id_relacion });

    if (!relacion) {
      throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.relacionRepository.delete(id_relacion);
  }
}
