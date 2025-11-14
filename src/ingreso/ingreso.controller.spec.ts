import { Test, TestingModule } from '@nestjs/testing';
import { IngresoController } from './ingreso.controller';

describe('IngresoController', () => {
  let controller: IngresoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresoController],
    }).compile();

    controller = module.get<IngresoController>(IngresoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
