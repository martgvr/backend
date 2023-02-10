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

  async create(createCartDto: CreateCartDto) {
    try {
      const cartSchema = new this.model({
        ...createCartDto,
        products: [],
        total: 0,
      });
      const data = await cartSchema.save();
      return { message: 'Cart created successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      const data = await this.model.findOneAndUpdate({ cartID: id }, updateCartDto.cleanCart === 1 ? ({ $set: { products: [] } }) : ({ $push: { products: updateCartDto } }), { new: true });
      return { message: `Cart ${updateCartDto.cleanCart === 1 ? 'cleaned' : 'updated'} successfully`, data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }

  }

  async remove(id: string) {
    try {
      const data = await this.model.deleteOne({ cartID: id });
      return { message: 'Cart removed successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }
}
