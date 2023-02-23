import { ordersDAO } from "../persistence/daos/factory.js"

export default class OrdersController {
    saveData = async (req, res) => ordersDAO.save(req.body).then(data => res.send(data))
    getData = async (req, res) => ordersDAO.getAll().then(data => res.send(data))
    getDataByID = async (req, res) => ordersDAO.getByID(req.params.id).then(data => res.send(data))
    updateDataByID = async (req, res) => ordersDAO.updateOrder(req.params.id, req.body).then(data => res.send(data))
    deleteByID = async (req, res) => ordersDAO.deleteByID(req.params.messageid).then(data => res.send(data))
    deleteAll = async (req, res) => ordersDAO.deleteAll().then(data => res.send(data))
}