import { Test, TestingModule } from '@nestjs/testing';
import { RelacionPersonaAnimalService } from './relacion_persona_animal.service';

describe('RelacionPersonaAnimalService', () => {
  let service: RelacionPersonaAnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelacionPersonaAnimalService],
    }).compile();

    service = module.get<RelacionPersonaAnimalService>(RelacionPersonaAnimalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
