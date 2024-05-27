import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/exist/:id')
  chechUserExist(@Param('id') id: string) {
    return this.userService.chechIsUserIdExist(id);
  }

  @Post()
  saveUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.saveUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
}
