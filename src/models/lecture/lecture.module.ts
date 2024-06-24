import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { ConfigService } from '@nestjs/config';
import { auth } from 'google-auth-library';
import { SpacesServiceClient } from '@google-apps/meet';

@Module({
  controllers: [LectureController],
  providers: [
    LectureService,
    {
      provide: 'LECTURE_API',
      useFactory: (configService: ConfigService) => {
        return new SpacesServiceClient({
          authClient: auth.fromJSON({
            type: configService.get('USER_TYPE'),
            client_id: configService.get('CLIENT_ID'),
            client_secret: configService.get('CLIENT_SECRET'),
            refresh_token: configService.get('REFRESH_TOKEN')
          })
        });
      },
      inject: [ConfigService]
    }
  ]
})
export class LectureModule {}
