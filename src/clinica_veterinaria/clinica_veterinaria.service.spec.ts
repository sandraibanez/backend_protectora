import { Test, TestingModule } from '@nestjs/testing';
import { ClinicaVeterinariaService } from './clinica_veterinaria.service';

describe('ClinicaVeterinariaService', () => {
  let service: ClinicaVeterinariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicaVeterinariaService],
    }).compile();

    service = module.get<ClinicaVeterinariaService>(ClinicaVeterinariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
