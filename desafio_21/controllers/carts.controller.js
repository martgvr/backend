import cartsRepository from '../persistence/repositories/carts.repository.js'
import { cartsDAO } from '../persistence/daos/factory.js'
import CartsDTO from '../persistence/dtos/carts.dto.js'

export default class CartsController {
    getCart = async (req, res) => {
        try {
            cartsDAO.findCartByID(req.user.cartID).then(response => {
                let total = 0;
                response.products.forEach(element => {
                    total += Number(element.itemPrice);
                });
    
                const dataDTO = new CartsDTO(response, total).getCartData()
                res.render('cart', { dataDTO, user: req.user })
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