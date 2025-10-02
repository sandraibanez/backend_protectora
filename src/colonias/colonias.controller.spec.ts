import { Test, TestingModule } from '@nestjs/testing';
import { ColoniasController } from './colonias.controller';

describe('ColoniasController', () => {
  let controller: ColoniasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColoniasController],
    }).compile();

    controller = module.get<ColoniasController>(ColoniasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
