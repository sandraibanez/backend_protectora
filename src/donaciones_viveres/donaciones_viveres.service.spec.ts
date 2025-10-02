import { Test, TestingModule } from '@nestjs/testing';
import { DonacionesViveresService } from './donaciones_viveres.service';

describe('DonacionesViveresService', () => {
  let service: DonacionesViveresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonacionesViveresService],
    }).compile();

    service = module.get<DonacionesViveresService>(DonacionesViveresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
