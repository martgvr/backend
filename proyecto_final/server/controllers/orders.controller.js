import { ordersDAO } from "../persistence/daos/factory.js"

export default class OrdersController {
    saveData = (req, res) => ordersDAO.save(req.body).then(data => res.send(data))
    getData = (req, res) => ordersDAO.getAll().then(data => res.send(data))
    getDataByID = (req, res) => ordersDAO.getByID(req.params.id).then(data => res.send(data))
    updateDataByID = (req, res) => ordersDAO.updateOrder(req.params.id, req.body).then(data => res.send(data))
    deleteByID = (req, res) => ordersDAO.deleteByID(req.params.messageid).then(data => res.send(data))
    deleteAll = (req, res) => ordersDAO.deleteAll().then(data => res.send(data))
}