import MongoContainer from '../../containers/MongoContainer.js'
import { usersModel } from '../../models/users.model.js'

export default class UsersMongoDAO extends MongoContainer {
    constructor() {
        super(usersModel)
    }
}