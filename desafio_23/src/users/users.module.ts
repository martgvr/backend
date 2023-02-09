import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModel, Users } from './schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersModel }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
