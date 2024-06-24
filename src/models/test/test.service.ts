import { TextServiceClient } from '@google-ai/generativelanguage';
import { Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';

@Injectable()
export class TestService {
  private client: TextServiceClient;

  constructor(
    @Inject('BARD') client: TextServiceClient,
    private readonly courseService: CourseService
  ) {
    this.client = client;
  }

  async askGpt(topic): Promise<string> {
    const result = await this.client.generateText({
      model: 'models/text-bison-001',
      temperature: 0.7,
      candidateCount: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
      stopSequences: [],
      prompt: {
        text: `
        You are a helpful AI that generates 5 questions and answers. Each answer should not exceed 10 words. Store all question-answer pairs in a string array.
        Topic: ${topic}
        Each question should include "question", "answer", and "options". "options" is an array of 5 random answer options. "answer" is the index of the correct option without quotation marks or escape characters.
        
        example:
         {
          "question": "...",
          "answer": number of option,
          "options": [
            "option 1",
            "option 2",
            "option 3",
            "option 4",
            "option 5"
          ]
        }
        `
      }
    });
    const outputs = [];

    (result as any).forEach(function (d1) {
      if (d1 != null) {
        d1.candidates.forEach(function (d2) {
          outputs.push(d2.output);
        });
      }
    });

    return outputs as any;
  }

  fixMalformedJSON(malformedJSONArray) {
    const malformedJSON = malformedJSONArray[0];

    const fixedString = malformedJSON.replace(/```/g, '');

    try {
      const jsonObject = JSON.parse(fixedString);
      return jsonObject;
    } catch (error) {
      console.error('Ошибка парсинга JSON:', error);
      return null;
    }
  }

  async createTest(courseId: string, variantsCount: number) {
    try {
      const { title } = await this.courseService.findOne(courseId);
      const result = (await this.askGpt(title)) as any;
      console.log(this.fixMalformedJSON(result));
      return [
        ...this.fixMalformedJSON(result),
        ...this.fixMalformedJSON(result)
      ];
    } catch (error) {
      console.error('Ошибка при создании теста:', error);
      await this.wait(1000);
      return this.createTest(courseId, variantsCount);
    }
  }

  async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
