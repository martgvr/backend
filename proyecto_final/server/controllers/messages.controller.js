import { messagesDAO } from "../persistence/daos/factory.js"

export default class MessagesController {
    postHandler = async (req, res) => messagesDAO.save(req.body).then(data => res.send(data))
    getHandler = async (req, res) => res.render('chat', { user: req.user })
}