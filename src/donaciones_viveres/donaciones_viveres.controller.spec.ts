import { Test, TestingModule } from '@nestjs/testing';
import { DonacionesViveresController } from './donaciones_viveres.controller';

describe('DonacionesViveresController', () => {
  let controller: DonacionesViveresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonacionesViveresController],
    }).compile();

    controller = module.get<DonacionesViveresController>(DonacionesViveresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
