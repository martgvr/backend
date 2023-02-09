import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { CartsModel, Carts } from './schema/carts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carts.name, schema: CartsModel }])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
