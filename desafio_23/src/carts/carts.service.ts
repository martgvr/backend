import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Carts, CartsDocument } from './schema/carts.schema';

@Injectable()
export class CartsService {
  model: any;

  constructor(@InjectModel(Carts.name) cartsModel: Model<CartsDocument>) {
    this.model = cartsModel;
  }

  async findAll() {
    try {
      const data = await this.model.find({});
      return { message: 'Carts found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.model.findOne({ cartID: id });
      return { message: 'Cart found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
