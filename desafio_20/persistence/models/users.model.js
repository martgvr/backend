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
    avatar: String,
    cartID: String
})

// export default mongoose.model('Users', userSchema)
export const usersModel = mongoose.model('Users', userSchema)