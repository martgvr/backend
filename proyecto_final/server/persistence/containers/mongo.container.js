export default class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async save(obj) {
        try {
            const dataSchema = new this.model(obj)
            const data = await dataSchema.save()
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            console.log(error);
            return { error: 'Something went wrong' }
        }
    }

    async getAll() {
        try {
            const data = await this.model.find({})
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async getByID(id) {
        try {
            const data = await this.model.findById(id);
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async update(itemToUpdate, newValue) {
        try {
            const data = await this.model.updateOne(itemToUpdate, { $set: newValue })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            console.log(error);
            return { error: 'Something went wrong' }
        }
    }

    async deleteByID(id) {
        try {
            const data = await this.model.deleteOne({ _id: id })
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async deleteAll() {
        try {
            const data = await this.model.deleteMany({})
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }
}