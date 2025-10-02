import { Test, TestingModule } from '@nestjs/testing';
import { ClinicaVeterinariaController } from './clinica_veterinaria.controller';

describe('ClinicaVeterinariaController', () => {
  let controller: ClinicaVeterinariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicaVeterinariaController],
    }).compile();

    controller = module.get<ClinicaVeterinariaController>(ClinicaVeterinariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
