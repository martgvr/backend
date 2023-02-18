import MongoContainer from '../../containers/mongo.container.js'
import { usersModel } from '../../models/mongo/users.mongo.model.js'

export default class UsersMongoDAO extends MongoContainer {
    constructor() {
        super(usersModel)
    }

    async findUser(userID) {
        try {
            const data = await this.model.findOne({ _id: userID });
            return data;
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async findByUsername(username) {
        try {
            const data = await this.model.findOne({ username: username });
            return data;
        } catch (error) {
            console.log(error);
            return { error: 'Something went wrong' }
        }
    }

    async updateUser() {
        return 'ok'
    }
}