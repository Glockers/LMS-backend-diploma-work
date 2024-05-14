import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './models/course/course.module';
import { ChapterModule } from './models/chapter/chapter.module';
import { StripeModule } from './models/stripe/stripe.module';
import { CertificateModule } from './models/certificate/certificate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    CourseModule,
    ChapterModule,
    StripeModule,
    CertificateModule
    // MailerModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get('MAIL_HOST'),
    //       port: configService.get('MAIL_PORT'),
    //       secure: false, // upgrade later with STARTTLS
    //       auth: {
    //         user: configService.get('MAIL_USER'),
    //         pass: configService.get('MAIL_PASSWORD')
    //       }
    //     },
    //     defaults: {
    //       from: configService.get('MAIL_SENDER')
    //     }
    //   })
    // })
  ]
})
export class AppModule {}
