import { cartsDAO, ordersDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    saveData = (req, res) => cartsDAO.addItemToCart(req.user.data.cartID, req.body.product).then(response => res.send(response))
    clearCartByID = (req, res) => cartsDAO.clearCart(req.params.cartid).then(response => res.send(response))
    removeCartItem = (req, res) => cartsDAO.removeCartItem(req.params.cartid, req.params.itemid).then(response => res.send(response))
    successRender = (req, res) => res.render('success')

    cartCheckout = (req, res) => {
        console.log(req.user);
        cartsDAO.cartCheckout(req.user.data.cartID, req.user).then(response => res.send(response))
        ordersDAO.save({ products: "", status: "", timestamp: "", orderEmail: "", orderID: "" })
    }

    getData = (req, res) => {
        cartsDAO.findCartByID(req.user.data.cartID).then(response => {

            if(typeof response.data.products === 'string') {
                let modifiedData = response.data
                modifiedData.products = JSON.parse(response.data.products)
            }

            res.render('cart', { dataDTO: response, user: req.user })
        })
    }
}