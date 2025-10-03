import { Test, TestingModule } from '@nestjs/testing';
import { RelacionPersonaAnimalController } from './relacion_persona_animal.controller';

describe('RelacionPersonaAnimalController', () => {
  let controller: RelacionPersonaAnimalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelacionPersonaAnimalController],
    }).compile();

    controller = module.get<RelacionPersonaAnimalController>(RelacionPersonaAnimalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
