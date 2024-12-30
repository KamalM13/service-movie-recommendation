import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    var user = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (user) {
      throw new NotFoundException('Username already exists');
    }
    user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new NotFoundException('Email already exists');
    }
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(
    username: string,
    email: string,
    password: string,
    response: Response, // Add Response object to set cookies
  ): Promise<User> {
    let user;

    // Find user by username or email
    if (username) {
      user = await this.userModel.findOne({ username });
    } else {
      user = await this.userModel.findOne({ email });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException('Invalid password');
    }

    // Generate JWT token
    const payload = { userId: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    return user; // Return user data (without the password)
  }
  // Retrieve a user by ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('watchedMovies likedMovies watchList');
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .populate('watchedMovies likedMovies watchList')
      .exec();
  }

  // Retrieve a single user (by ID or username)
  async findOne(filter: { id?: string; username?: string }): Promise<User> {
    const user = await this.userModel
      .findOne(filter)
      .populate('watchedMovies likedMovies watchList');
    if (!user) {
      throw new NotFoundException(`User not found with the given filter`);
    }
    return user;
  }

  // Update an existing user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('watchedMovies likedMovies watchList');
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  // Delete a user
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
