import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  
  imports: [CartsModule, ProductsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://root:rootmongo123456@cluster0.vpzccsu.mongodb.net/users?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
