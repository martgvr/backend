import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    messageID: { type: String, required: true },
    timestamp: { type: String, required: true },
    text: { type: String, required: true }
})

export const messagesModel = mongoose.model('Messages', messagesSchema)