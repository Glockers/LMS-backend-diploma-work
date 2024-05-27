import { Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('questions')
  getQuestions(
    @Query('courseId') courseId: string,
    @Query('variantsCount') variantsCount: number
  ) {
    return this.testService.createTest(courseId, variantsCount);
  }
}
