import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  productsModel: any

  constructor(@InjectModel(Products.name) productsModel: Model<ProductsDocument>) {
    this.productsModel = productsModel
  }

  async findAll() {
    try {
      const data = await this.productsModel.find({})
      return { message: 'Products found', data };
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.productsModel.findById(id);
      return data;
    } catch (error) {
      return { message: 'Something went wrong =/', error };
    }
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
