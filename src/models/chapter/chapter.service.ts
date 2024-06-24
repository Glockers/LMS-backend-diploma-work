import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateTheoryProgress } from './dto/update-theory-progress';
import { TestResult } from './dto/test-result.dto';
import { CertificateService } from '../certificate/certificate.service';

@Injectable()
export class ChapterService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly certificateService: CertificateService
  ) {}

  async updateProgress({
    userId,
    chapterId,
    isCompleted
  }: UpdateTheoryProgress) {
    const userProgress = await this.databaseService.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: chapterId
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        isCompleted,
        chapterId: chapterId
      }
    });

    return userProgress;
  }

  async updateTest({
    correctAnswers,
    courseId,
    timeEnd,
    timeStart,
    userId
  }: TestResult) {
    const isCompleted = correctAnswers <= 8 ? false : true;

    const userProgressTest = await this.databaseService.userProgressTest.upsert(
      {
        where: {
          userId_courseId: {
            userId,
            courseId: courseId
          }
        },
        update: {
          isCompleted: isCompleted,
          correctAnswers,
          timeEnd,
          timeStart
        },
        create: {
          timeStart,
          timeEnd,
          correctAnswers,
          userId,
          isCompleted,
          courseId: courseId
        }
      }
    );

    if (isCompleted) {
      this.certificateService.create({ courseId, userId });
    }
    return userProgressTest;
  }

  async getProgress(userId: string, courseId: string) {
    try {
      const publishedChapters = await this.databaseService.chapter.findMany({
        where: {
          courseId,
          isPublished: true
        },
        select: {
          id: true
        }
      });

      const testLength = 1;

      const publishedChapterIds = publishedChapters.map(({ id }) => id);

      const validCompletedChapters =
        await this.databaseService.userProgress.count({
          where: {
            userId,
            isCompleted: true,
            chapterId: {
              in: publishedChapterIds
            }
          }
        });

      const isCompletedTest = await this.databaseService.userProgressTest.count(
        {
          where: {
            userId,
            isCompleted: true,
            courseId
          }
        }
      );

      const resultPercentage =
        ((validCompletedChapters + isCompletedTest) /
          (publishedChapters.length + testLength)) *
        100;

      const theoryResult =
        (validCompletedChapters / publishedChapters.length) * 100;

      return {
        theoryResult: theoryResult,
        testResult: isCompletedTest,
        resultProgress: resultPercentage
      };
    } catch (error) {
      console.error('[GET_PROGRESS]', error);
      return 0;
    }
  }

  async getProgressTest(userId: string, courseId: string) {
    return await this.databaseService.userProgressTest.findFirst({
      where: {
        userId,
        courseId
      }
    });
  }

  async deleteProgressTest(userId: string, courseId: string) {
    return await this.databaseService.userProgressTest.delete({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });
  }
}
