import { Test, TestingModule } from '@nestjs/testing';
import { GastosService } from './gastos.service';

describe('GastosService', () => {
  let service: GastosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosService],
    }).compile();

    service = module.get<GastosService>(GastosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
