import { Test, TestingModule } from '@nestjs/testing';
import { AnimalEntidadController } from './animal_entidad.controller';

describe('AnimalEntidadController', () => {
  let controller: AnimalEntidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalEntidadController],
    }).compile();

    controller = module.get<AnimalEntidadController>(AnimalEntidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
