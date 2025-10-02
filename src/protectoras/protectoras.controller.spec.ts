import { Test, TestingModule } from '@nestjs/testing';
import { ProtectorasController } from './protectoras.controller';

describe('ProtectorasController', () => {
  let controller: ProtectorasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtectorasController],
    }).compile();

    controller = module.get<ProtectorasController>(ProtectorasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
