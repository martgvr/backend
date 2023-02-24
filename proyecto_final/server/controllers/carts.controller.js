import { cartsDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    getData = async (req, res) => cartsDAO.findCartByID(req.user.data.cartID).then(response => res.render('cart', { dataDTO: response, user: req.user }))
    saveData = async (req, res) => cartsDAO.addItemToCart(req.user.data.cartID, req.body.product).then(response => res.send(response))
    clearCartByID = async (req, res) => cartsDAO.clearCart(req.params.cartid).then(response => res.send(response))
    removeCartItem = async (req, res) => cartsDAO.removeCartItem(req.params.cartid, req.params.itemid).then(response => res.send(response))
    cartCheckout = async (req, res) => cartsDAO.cartCheckout(req.user.data.cartID, req.user).then(response => res.send(response))
}