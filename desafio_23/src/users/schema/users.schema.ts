import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UsersDocument = HydratedDocument<Users>

@Schema()
export class Users {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    address: string

    @Prop({ required: true })
    age: string

    @Prop({ required: true })
    areacode: string

    @Prop({ required: true })
    telephone: string

    @Prop({ required: true })
    avatar: string

    @Prop({ required: true })
    cartID: string
}

export const UsersModel = SchemaFactory.createForClass(Users)