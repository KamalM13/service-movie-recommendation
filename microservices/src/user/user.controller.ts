import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.login(username, email, password, response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyProfile(@Req() req) {
    const userId = req.user.userId;
    return this.userService.getUserById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  async updateMyProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.userService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  async deleteMyAccount(@Req() req) {
    const userId = req.user.userId;
    return this.userService.remove(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
