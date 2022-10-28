import { cartsModel, productsModel } from './mongoModel.js'
import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vpzccsu.mongodb.net/atlasMongoose?retryWrites=true&w=majority`
mongoose.connect(URL)
mongoose.connection.on('open', () => console.log(`Conectado a MongoDB`))
mongoose.connection.on('error', (e) => console.log(e))

class Contenedor {
    constructor(model) {
        this.model = model;
    }

    async save(obj) {
        try {
            const productSchema = new this.model(obj)
            const productCreated = await productSchema.save()
            return (productCreated);
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async getAll() {
        try {
            const data = await this.model.find({})
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async getByID(id) {
        try {
            const data = await this.model.findById(id);
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async update(itemToUpdate, newValue) {
        try {
            const updatedItem = await this.model.updateOne(itemToUpdate, { $set: newValue })
            return updatedItem;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async deleteByID(id) {
        try {
            const data = await this.model.deleteOne({ _id: id });
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async deleteAll() {
        try {
            const data = await this.model.deleteMany({});
            return data;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }
}

export const mongoCarts = new Contenedor(cartsModel)
export const mongoProducts = new Contenedor(productsModel)