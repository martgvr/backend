import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    text: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    timestamp: { type: String, required: true }
})

export const messagesModel = mongoose.model('Messages', messagesSchema)