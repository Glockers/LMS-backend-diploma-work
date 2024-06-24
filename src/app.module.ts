import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './models/course/course.module';
import { ChapterModule } from './models/chapter/chapter.module';
import { StripeModule } from './models/stripe/stripe.module';
import { CertificateModule } from './models/certificate/certificate.module';
import { UserModule } from './models/user/user.module';
import { TestModule } from './models/test/test.module';
import { LectureModule } from './models/lecture/lecture.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    CourseModule,
    ChapterModule,
    StripeModule,
    CertificateModule,
    UserModule,
    TestModule,
    LectureModule
  ]
})
export class AppModule {}
