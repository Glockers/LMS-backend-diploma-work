import { SpacesServiceClient } from '@google-apps/meet';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LectureService {
  meetClient: SpacesServiceClient;

  constructor(
    @Inject('LECTURE_API') meetClient: SpacesServiceClient,
    private readonly databaseService: DatabaseService
  ) {
    this.meetClient = meetClient;
  }

  async deleteLecture(lectureId: string) {
    const nameMeet = (await this.getLecture(lectureId)).name;
    const request = {
      name: nameMeet
    };

    try {
      const meet = nameMeet && (await this.meetClient.getSpace(request));

      if (meet && meet[0]?.activeConference?.conferenceRecord) {
        await this.meetClient.endActiveConference(request);
      }

      const res = await this.databaseService.lectures.delete({
        where: {
          id: lectureId
        }
      });
      return [res];
    } catch (err) {
      console.log(err);
    }
  }

  async getAllLectures() {
    return await this.databaseService.lectures.findMany();
  }

  async saveLecture(lecture: Prisma.LecturesCreateInput) {
    console.log(lecture);
    const { name, uri } = await this.createSpace();
    lecture.link = uri;
    lecture.name = name;
    return await this.databaseService.lectures.create({ data: lecture });
  }

  async getLecture(lectureId: string) {
    return await this.databaseService.lectures.findUnique({
      where: { id: lectureId }
    });
  }

  async updateLecture(
    lectureId: string,
    { date, time, title }: Prisma.LecturesUpdateInput
  ) {
    return await this.databaseService.lectures.update({
      where: { id: lectureId },
      data: {
        date,
        time,
        title
      }
    });
  }

  async createSpace() {
    const request = {};

    const response = await this.meetClient.createSpace(request);
    console.log(response);
    return {
      uri: response[0].meetingUri,
      name: response[0].name
    };
  }
}
