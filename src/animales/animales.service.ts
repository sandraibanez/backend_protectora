import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animales } from './animales.entity';
@Injectable()
export class AnimalesService {
  constructor(
    @InjectRepository(Animales)
    private readonly animalesRepository: Repository<Animales>,
  ) {}
  findAll(): Promise<Animales[]> {
    return this.animalesRepository.find();
  }
  findOne(id: number): Promise<Animales | null> {
    return this.animalesRepository.findOneBy({ id });
  }
  create(animal: Animales): Promise<Animales> {
    return this.animalesRepository.save(animal);
  }
  async remove(id: number): Promise<void> {
    await this.animalesRepository.delete(id);
  }
}
