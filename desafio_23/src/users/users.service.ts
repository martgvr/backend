import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  model: any;

  constructor(@InjectModel(Users.name) usersModel: Model<UsersDocument>) {
    this.model = usersModel;
  }

  async findAll() {
    try {
      const data = await this.model.find({});
      return { message: 'Users found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async findOne(username: string) {
    try {
      const data = await this.model.findOne({ username: username });
      return { message: data === null ? 'User not found' : 'User found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const userSchema = new this.model(createUserDto);
      const data = await userSchema.save();
      return { message: 'User created successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.model.findOneAndUpdate({ username: username }, updateUserDto, { new: true });
      return { message: data === null ? 'User not found' : 'User modified successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async remove(username: string) {
    try {
      const data = await this.model.deleteOne({ username: username });
      return { message: data.deletedCount === 0 ? 'User not found' : 'User deleted successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }
}
