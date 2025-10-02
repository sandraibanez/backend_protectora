import { Test, TestingModule } from '@nestjs/testing';
import { MedicacionService } from './medicacion.service';

describe('MedicacionService', () => {
  let service: MedicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicacionService],
    }).compile();

    service = module.get<MedicacionService>(MedicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
