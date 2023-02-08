import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CartsDocument = HydratedDocument<Carts>

@Schema()
export class Carts {
    @Prop({ required: true, unique: true })
    cartID: string

    @Prop({ required: true })
    products: string

    @Prop({ required: true })
    total: number
}

export const CartsModel = SchemaFactory.createForClass(Carts)