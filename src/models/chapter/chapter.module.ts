import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { CertificateModule } from '../certificate/certificate.module';

@Module({
  imports: [CertificateModule],
  controllers: [ChapterController],
  providers: [ChapterService]
})
export class ChapterModule {}
