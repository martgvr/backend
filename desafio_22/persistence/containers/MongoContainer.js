export default class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async save(obj) {
        try {
            const productSchema = new this.model(obj)
            const productCreated = await productSchema.save()
            return (productCreated);
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async getAll() {
        try {
            const data = await this.model.find({})
            return data;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async getByID(id) {
        try {
            const data = await this.model.findById(id);
            return data;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async update(itemToUpdate, newValue) {
        try {
            const updatedItem = await this.model.updateOne(itemToUpdate, { $set: newValue })
            return updatedItem;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteByID(id) {
        try {
            const data = await this.model.deleteOne({ _id: id });
            return data;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteAll() {
        try {
            const data = await this.model.deleteMany({});
            return data;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
}