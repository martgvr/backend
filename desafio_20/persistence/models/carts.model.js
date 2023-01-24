import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartID: { type: String, required: true },
    products: { type: Array },
    total: { type: Number }
})

export const cartModel = mongoose.model('Cart', cartSchema)