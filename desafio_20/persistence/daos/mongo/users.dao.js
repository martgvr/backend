import MongoContainer from '../../containers/MongoContainer.js'
import { usersModel } from '../../models/users.model.js'

export default class UsersMongoDAO extends MongoContainer {
    constructor() {
        super(usersModel)
    }

    async find(username) {
        try {
            const data = await this.model.find(username);
            return data;
        } catch (error) {
            return { error: 'Algo salió mal con el find' }
        }
    }
}