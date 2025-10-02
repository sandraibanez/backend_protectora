import { Test, TestingModule } from '@nestjs/testing';
import { ProtectorasService } from './protectoras.service';

describe('ProtectorasService', () => {
  let service: ProtectorasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtectorasService],
    }).compile();

    service = module.get<ProtectorasService>(ProtectorasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
