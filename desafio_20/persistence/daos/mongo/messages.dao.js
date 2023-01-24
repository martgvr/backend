import MongoContainer from '../../containers/MongoContainer.js'
import { messagesModel } from '../../models/messages.model.js'

export default class MessagesMongoDAO extends MongoContainer {
    constructor() {
        super(messagesModel)
    }
}