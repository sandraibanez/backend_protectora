import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelacionPersonaAnimal, TipoRelacion } from './relacion_persona_animal.entity';
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

  async createRelacion(createRelacionDto: CreateRelacionPersonaAnimalDto): Promise<RelacionPersonaAnimal> {

    if (typeof createRelacionDto.fecha !== 'string' && !(createRelacionDto.fecha instanceof Date)) {
        throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
    }else if (typeof createRelacionDto.fecha === 'string') {
      if (isNaN(Date.parse(createRelacionDto.fecha))) {
        throw new HttpException(
          'La fecha debe tener formato válido YYYY-MM-DD',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (!Object.values(TipoRelacion).includes(createRelacionDto.accion)) {
        throw new HttpException('La acción debe ser adopta, acoge o apadrina', HttpStatus.BAD_REQUEST);
    }
    
    if (typeof createRelacionDto.persona !== 'number') {
        throw new HttpException('El ID de la persona debe ser un número', HttpStatus.BAD_REQUEST);
    }
    
    if (typeof createRelacionDto.animal !== 'number') {
        throw new HttpException('El ID del animal debe ser un número', HttpStatus.BAD_REQUEST);
    }

    const persona = await this.userRepository.findOneBy({ id_user: createRelacionDto.persona });
    if (!persona) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }

    const animal = await this.animalRepository.findOneBy({ id_animal: createRelacionDto.animal });
    if (!animal) {
      throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST);
    }

    const relacion = this.relacionRepository.create({
      fecha: new Date(createRelacionDto.fecha),
      accion: createRelacionDto.accion,
      persona,
      animal,
    });

    return this.relacionRepository.save(relacion);
  }

  async updateRelacion(updateRelacionDto: UpdateRelacionPersonaAnimalDto): Promise<RelacionPersonaAnimal> {
    const relacion = await this.relacionRepository.findOne({
      where: { id_relacion: updateRelacionDto.id_relacion },
      relations: ['persona', 'animal'],
    });

    if (!relacion) {
      throw new HttpException('Relación no encontrada', HttpStatus.NOT_FOUND);
    }

    if (updateRelacionDto.fecha !== undefined &&
        typeof updateRelacionDto.fecha !== 'string' &&
        !(updateRelacionDto.fecha instanceof Date)) {
        throw new HttpException('La fecha debe ser una fecha válida', HttpStatus.BAD_REQUEST);
    }else if (typeof updateRelacionDto.fecha === 'string') {
      if (isNaN(Date.parse(updateRelacionDto.fecha))) {
        throw new HttpException(
          'La fecha debe tener formato válido YYYY-MM-DD',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateRelacionDto.accion !== undefined && !Object.values(TipoRelacion).includes(updateRelacionDto.accion)) {
        throw new HttpException('La acción debe ser adopta, acoge o apadrina', HttpStatus.BAD_REQUEST);
    }
    
    if (updateRelacionDto.persona !== undefined && typeof updateRelacionDto.persona !== 'number') {
        throw new HttpException('El ID de la persona debe ser un número', HttpStatus.BAD_REQUEST);
    }
    
    if (updateRelacionDto.animal !== undefined && typeof updateRelacionDto.animal !== 'number') {
        throw new HttpException('El ID del animal debe ser un número', HttpStatus.BAD_REQUEST);
    }

    // Actualizar las relaciones si se pasan nuevos IDs
    if (updateRelacionDto.persona !== undefined) {
      const persona = await this.userRepository.findOneBy({ id_user: updateRelacionDto.persona });
      if (!persona) {
        throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
      }
      relacion.persona = persona;
    }

    if (updateRelacionDto.animal !== undefined) {
      const animal = await this.animalRepository.findOneBy({ id_animal: updateRelacionDto.animal });
      if (!animal) {
        throw new HttpException('Animal no encontrado', HttpStatus.BAD_REQUEST);
      }
      relacion.animal = animal;
    }

    const camposSimples = this.relacionRepository.create({
      fecha: updateRelacionDto.fecha,
      accion: updateRelacionDto.accion,
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
