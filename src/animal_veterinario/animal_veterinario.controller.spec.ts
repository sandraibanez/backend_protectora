import { Test, TestingModule } from '@nestjs/testing';
import { AnimalVeterinarioController } from './animal_veterinario.controller';

describe('AnimalVeterinarioController', () => {
  let controller: AnimalVeterinarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalVeterinarioController],
    }).compile();

    controller = module.get<AnimalVeterinarioController>(AnimalVeterinarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
