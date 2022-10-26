import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    }
})

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    stock: {
        type: Number,
        required: true
    }
})

export const cartsModel = mongoose.model('Carts', cartsSchema)
export const productsModel = mongoose.model('Products', productsSchema)