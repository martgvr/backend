import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 50, unique: true },
    price: { type: Number, required: true, default: 100 },
    photo: { type: String, required: true }
})

export const productsModel = mongoose.model('Products', productsSchema)