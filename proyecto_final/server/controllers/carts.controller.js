import { cartsDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    getData = (req, res) => cartsDAO.findCartByID(req.user.data.cartID).then(response => res.render('cart', { dataDTO: response, user: req.user }))
    saveData = (req, res) => cartsDAO.addItemToCart(req.user.data.cartID, req.body.product).then(response => res.send(response))
    clearCartByID = (req, res) => cartsDAO.clearCart(req.params.cartid).then(response => res.send(response))
    removeCartItem = (req, res) => cartsDAO.removeCartItem(req.params.cartid, req.params.itemid).then(response => res.send(response))
    cartCheckout = (req, res) => cartsDAO.cartCheckout(req.user.data.cartID, req.user).then(response => res.send(response))
    successRender = (req, res) => res.render('success')
}