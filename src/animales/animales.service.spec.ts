import { Test, TestingModule } from '@nestjs/testing';
import { AnimalesService } from './animales.service';

describe('AnimalesService', () => {
  let service: AnimalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalesService],
    }).compile();

    service = module.get<AnimalesService>(AnimalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
