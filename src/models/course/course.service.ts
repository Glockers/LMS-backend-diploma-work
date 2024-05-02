import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCourseDto: Prisma.CourseCreateInput) {
    return this.databaseService.course.create({ data: createCourseDto });
  }

  findAll() {
    return this.databaseService.course.findMany();
  }

  findOne(id: string) {
    return this.databaseService.course.findUnique({
      where: {
        id
      }
    });
  }

  update(id: string, updateCourseDto: Prisma.CourseUpdateInput) {
    return this.databaseService.course.update({
      where: {
        id
      },
      data: updateCourseDto
    });
  }

  remove(id: string) {
    return this.databaseService.course.delete({
      where: { id }
    });
  }
}
