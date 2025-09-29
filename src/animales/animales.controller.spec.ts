import { Test, TestingModule } from '@nestjs/testing';
import { AnimalesController } from './animales.controller';

describe('AnimalesController', () => {
  let controller: AnimalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalesController],
    }).compile();

    controller = module.get<AnimalesController>(AnimalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});