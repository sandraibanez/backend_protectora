import { Test, TestingModule } from '@nestjs/testing';
import { AnimalEntidadService } from './animal_entidad.service';

describe('AnimalEntidadService', () => {
  let service: AnimalEntidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalEntidadService],
    }).compile();

    service = module.get<AnimalEntidadService>(AnimalEntidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
