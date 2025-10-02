import { Test, TestingModule } from '@nestjs/testing';
import { GastosController } from './gastos.controller';

describe('GastosController', () => {
  let controller: GastosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosController],
    }).compile();

    controller = module.get<GastosController>(GastosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
