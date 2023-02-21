import { messagesDAO } from "../persistence/daos/factory.js"

export default class MessagesController {
    saveData = async (req, res) => messagesDAO.save(req.body).then(data => res.send(data))
    getData = async (req, res) => messagesDAO.getAll().then(data => res.render('chat', { user: req.user , data: data.data, userData: req.user.data }))
    deleteByID = async (req, res) => messagesDAO.deleteByID(req.params.messageid).then(data => res.send(data))
}