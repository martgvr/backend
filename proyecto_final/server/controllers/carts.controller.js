import { cartsDAO, ordersDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    saveData = (req, res) => cartsDAO.addItemToCart(req.user.data.cartID, req.body.product).then(response => res.send(response))
    clearCartByID = (req, res) => cartsDAO.clearCart(req.params.cartid).then(response => res.send(response))
    removeCartItem = (req, res) => cartsDAO.removeCartItem(req.params.cartid, req.params.itemid).then(response => res.send(response))
    successRender = (req, res) => res.render('success')

    getData = (req, res) => {
        cartsDAO.findCartByID(req.user.data.cartID).then(response => {
            let modifiedData = response
            modifiedData.data.products = (response.data.products === '') ? [] : JSON.parse(response.data.products)
            res.render('cart', { dataDTO: modifiedData, user: req.user })
        })
    }

    cartCheckout = (req, res) => {
        const today = new Date()
        const timestamp = `${today.toLocaleDateString()} | ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

        cartsDAO.cartCheckout(req.user.data.cartID, req.user).then(response => res.send(response.data))
        cartsDAO.findCartByID(req.user.data.cartID).then(response => {
            ordersDAO.save({ products: response.data.products, status: "undelivered", timestamp: timestamp, orderEmail: req.user.data.email, orderID: Math.floor(Math.random() * 10000) })
        })
    }
}