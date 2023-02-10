import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [CartsModule, ProductsModule, UsersModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
