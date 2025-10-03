import { Test, TestingModule } from '@nestjs/testing';
import { AnimalVeterinarioService } from './animal_veterinario.service';

describe('AnimalVeterinarioService', () => {
  let service: AnimalVeterinarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalVeterinarioService],
    }).compile();

    service = module.get<AnimalVeterinarioService>(AnimalVeterinarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
