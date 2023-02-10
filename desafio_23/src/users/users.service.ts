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

  async findOne(id: string) {
    try {
      const data = await this.model.findOne({ username: id });
      return { message: 'User found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
