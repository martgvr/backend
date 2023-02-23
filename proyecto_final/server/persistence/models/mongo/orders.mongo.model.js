import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    products: { type: Array, required: true },
    status: { type: String, required: true },
    timestamp: { type: String, required: true },
    orderEmail: { type: String, required: true },
    orderID: { type: Number, required: true }
})

export const ordersModel = mongoose.model('Orders', ordersSchema)