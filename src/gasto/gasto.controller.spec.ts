import { Test, TestingModule } from '@nestjs/testing';
import { GastoController } from './gasto.controller';

describe('GastoController', () => {
  let controller: GastoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastoController],
    }).compile();

    controller = module.get<GastoController>(GastoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
