import MongoContainer from '../../containers/mongo.container.js'
import { messagesModel } from '../../models/mongo/messages.mongo.model.js'

export default class MessagesMongoDAO extends MongoContainer {
    constructor() {
        super(messagesModel)
    }
}