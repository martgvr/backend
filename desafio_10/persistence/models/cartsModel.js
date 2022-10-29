import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    }
})

export const cartsModel = mongoose.model('Carts', cartsSchema)