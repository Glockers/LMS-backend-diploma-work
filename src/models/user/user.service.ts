import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async chechIsUserIdExist(id: string) {
    const result = await this.databaseService.user.findUnique({
      where: {
        id
      }
    });

    return result ? true : false;
  }

  saveUser(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async getUser(userId: string) {
    return await this.databaseService.user.findUnique({
      where: {
        id: userId
      }
    });
  }
}
