import { Test, TestingModule } from '@nestjs/testing';
import { EntidadController } from './entidad.controller';

describe('EntidadController', () => {
  let controller: EntidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadController],
    }).compile();

    controller = module.get<EntidadController>(EntidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
