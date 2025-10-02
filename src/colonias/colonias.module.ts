import { Module } from '@nestjs/common';
import { ColoniasService } from './colonias.service';

@Module({
  providers: [ColoniasService]
})
export class ColoniasModule {}
