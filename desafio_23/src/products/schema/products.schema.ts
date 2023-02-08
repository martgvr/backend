import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ProductsDocument = HydratedDocument<Products>

@Schema()
export class Products {
    @Prop({ required: true, unique: true })
    name: string

    @Prop({ required: true })
    price: number

    @Prop({ required: true })
    photo: string
}

export const ProductsModel = SchemaFactory.createForClass(Products)