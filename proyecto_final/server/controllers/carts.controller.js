import { cartsDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    getCart = async (req, res) => {
        try {
            cartsDAO.findCartByID(req.user.data.cartID).then(response => {
                res.render('cart', { dataDTO: response, user: req.user })
            })
        } catch (error) {
            res.send('Something went wrong :/')
        }
    }

    postCart = async (req, res) => {
        try {
            cartsDAO.addItemToCart(req.user.cartID, req.body.product).then(response => res.send(response))
        } catch (error) {
            res.send('Something went wrong :/')
        }
    }

    cartCheckout = async (req, res) => {
        try {
            cartsDAO.findCartByID(req.user.cartID).then(response => {
                const cartRepoInstance = new cartsRepository(response, req.user)
                cartRepoInstance.sendEmail()
    
                cartsDAO.clearCart(req.user.cartID)
            })
        } catch (error) {
            res.send('Something went wrong :/')
        }
    }
}