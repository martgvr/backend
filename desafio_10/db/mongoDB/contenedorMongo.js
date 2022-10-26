import { cartsModel, productsModel } from './mongoModel.js'

class Contenedor {
    constructor(model) {
        this.model = model;
    }

    // CREATE
    async save(obj) {
        try {
            const productSchema = new this.model(obj)
            const productCreated = await productSchema.save()
            return (productCreated);
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    // READ
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

    // UPDATE
    async update(itemToUpdate, newValue) {
        try {
            const updatedItem = await this.model.updateOne(itemToUpdate, { $set: newValue })
            return updatedItem;
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    // DELETE
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