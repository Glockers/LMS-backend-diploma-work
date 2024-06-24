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

  async findAll() {
    return await this.databaseService.certificate.findMany({
      include: {
        course: {}
      }
    });
  }

  async deleteById(id: string) {
    const { courseId, userId } = await this.findOne(id);

    return await this.databaseService.$transaction(async (tx) => {
      await tx.userProgressTest.delete({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      });

      return await tx.certificate.delete({
        where: {
          id
        }
      });
    });
  }
}
