import { Module } from '@nestjs/common';
import { ProtectorasService } from './protectoras.service';

@Module({
  providers: [ProtectorasService]
})
export class ProtectorasModule {}
