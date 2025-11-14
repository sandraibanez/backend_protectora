import { Test, TestingModule } from '@nestjs/testing';
import { IngresoService } from './ingreso.service';

describe('IngresoService', () => {
  let service: IngresoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresoService],
    }).compile();

    service = module.get<IngresoService>(IngresoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
