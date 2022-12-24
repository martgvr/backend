import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

export default mongoose.model('Users', userSchema)