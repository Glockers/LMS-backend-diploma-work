import { Controller, Body, Patch, Query, Get, Post } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { UpdateTheoryProgress } from './dto/update-theory-progress';
import { TestResult } from './dto/test-result.dto';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Patch('/user-progress')
  async updateProgress(@Body() updateProgressTheory: UpdateTheoryProgress) {
    return this.chapterService.updateProgress(updateProgressTheory);
  }

  @Get('/progress')
  getProgress(
    @Query('userId') userId: string,
    @Query('courseId') courseId: string
  ) {
    return this.chapterService.getProgress(userId, courseId);
  }

  @Post('/check-test')
  async checkTest(@Body() data: TestResult) {
    return this.chapterService.updateTest(data);
  }

  @Get('/get-test-progress')
  async getTestProgress(
    @Query('userId') userId: string,
    @Query('courseId') courseId: string
  ) {
    console.log(await this.chapterService.getProgressTest(userId, courseId));
    return await this.chapterService.getProgressTest(userId, courseId);
  }
}
