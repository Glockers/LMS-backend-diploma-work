import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Prisma } from '@prisma/client';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  async createLecture(@Body() data: Prisma.LecturesCreateInput) {
    return await this.lectureService.saveLecture(data);
  }

  @Get('/all')
  async getLectures() {
    return await this.lectureService.getAllLectures();
  }

  @Delete(':productId')
  async deleteLecture(@Param('productId') lectureId: string) {
    return await this.lectureService.deleteLecture(lectureId);
  }

  @Patch(':productId')
  async updateLecture(
    @Param('productId') lectureId: string,
    @Body() data: Prisma.LecturesUpdateInput
  ) {
    return await this.lectureService.updateLecture(lectureId, data);
  }
}
