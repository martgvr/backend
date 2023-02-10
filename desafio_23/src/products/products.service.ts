import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  model: any;

  constructor(@InjectModel(Products.name) productsModel: Model<ProductsDocument>) {
    this.model = productsModel;
  }

  async findAll() {
    try {
      const data = await this.model.find({});
      return { message: 'Products found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.model.findById(id);
      return { message: 'Product found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const productSchema = new this.model(createProductDto);
      const data = await productSchema.save();
      return { message: 'Product created successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const data = await this.model.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
      return { message: 'Product modified successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async remove(id: string) {
    try {
      const data = await this.model.deleteOne({ _id: id });
      return { message: 'Product removed successfully', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }
}
