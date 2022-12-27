import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    address: String,
    age: String,
    areacode: String,
    telephone: String,
    avatar: String
})

export default mongoose.model('Users', userSchema)