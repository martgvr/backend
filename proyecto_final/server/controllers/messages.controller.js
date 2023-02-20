import { messagesDAO } from "../persistence/daos/factory.js"

export default class MessagesController {
    saveData = async (req, res) => messagesDAO.save(req.body).then(data => res.send(data))
    getData = async (req, res) => res.render('chat', { user: req.user })
}