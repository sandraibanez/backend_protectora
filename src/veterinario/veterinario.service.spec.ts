import { Test, TestingModule } from '@nestjs/testing';
import { VeterinarioService } from './veterinario.service';

describe('ClinicaVeterinariaService', () => {
  let service: VeterinarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeterinarioService],
    }).compile();

    service = module.get<VeterinarioService>(VeterinarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
