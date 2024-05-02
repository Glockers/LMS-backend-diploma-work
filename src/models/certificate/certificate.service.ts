import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Injectable()
export class CertificateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({ courseId, userId }: CreateCertificateDto) {
    return await this.databaseService.certificate.create({
      data: {
        userId: userId,
        courseId: courseId
      }
    });
  }

  findAllByUser(userId: string) {
    return this.databaseService.certificate.findMany({
      where: {
        userId
      },
      include: {
        course: true
      }
    });
  }

  findOne(id: string) {
    return this.databaseService.certificate.findUnique({
      where: {
        id
      }
    });
  }
}
