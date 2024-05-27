import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { ConfigService } from '@nestjs/config';
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [CourseModule],
  controllers: [TestController],
  providers: [
    TestService,
    {
      provide: 'BARD',
      useFactory: (configService: ConfigService) => {
        return new TextServiceClient({
          authClient: new GoogleAuth().fromAPIKey(configService.get('API_KEY'))
        });
      },
      inject: [ConfigService]
    }
  ]
})
export class TestModule {}
