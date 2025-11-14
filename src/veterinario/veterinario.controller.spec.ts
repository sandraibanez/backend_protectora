import { Test, TestingModule } from '@nestjs/testing';
import { VeterinarioController } from './veterinario.controller';

describe('VeterinarioController', () => {
  let controller: VeterinarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinarioController],
    }).compile();

    controller = module.get<VeterinarioController>(VeterinarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
