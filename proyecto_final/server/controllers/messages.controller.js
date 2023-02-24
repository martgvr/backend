import { messagesDAO } from "../persistence/daos/factory.js"

export default class MessagesController {
    saveData = (req, res) => messagesDAO.save(req.body).then(data => res.send(data))
    getData = (req, res) => messagesDAO.getAll().then(data => res.render('chat', { user: req.user , data: data.data, userData: req.user.data }))
    deleteByID = (req, res) => messagesDAO.deleteByID(req.params.messageid).then(data => res.send(data))
    deleteAll = (req, res) => messagesDAO.deleteAll().then(data => res.send(data))
}