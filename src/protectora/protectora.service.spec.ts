import { Test, TestingModule } from '@nestjs/testing';
import { ProtectoraService } from './protectora.service';

describe('ProtectoraService', () => {
  let service: ProtectoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtectoraService],
    }).compile();

    service = module.get<ProtectoraService>(ProtectoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
