import { Test, TestingModule } from '@nestjs/testing';
import { ProtectoraController } from './protectora.controller';

describe('ProtectoraController', () => {
  let controller: ProtectoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtectoraController],
    }).compile();

    controller = module.get<ProtectoraController>(ProtectoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
