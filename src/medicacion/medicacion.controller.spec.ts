import { Test, TestingModule } from '@nestjs/testing';
import { MedicacionController } from './medicacion.controller';

describe('MedicacionController', () => {
  let controller: MedicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicacionController],
    }).compile();

    controller = module.get<MedicacionController>(MedicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
