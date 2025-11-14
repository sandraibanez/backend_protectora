import { Test, TestingModule } from '@nestjs/testing';
import { ColoniaService } from './colonia.service';

describe('ColoniaService', () => {
  let service: ColoniaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColoniaService],
    }).compile();

    service = module.get<ColoniaService>(ColoniaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
