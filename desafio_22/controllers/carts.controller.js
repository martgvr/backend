import cartsRepository from '../persistence/repositories/carts.repository.js'
import { cartsDAO } from '../persistence/daos/factory.js'
import CartsDTO from '../persistence/dtos/carts.dto.js'

class CartsController {
    getCartByID = async (id) => {
        try {
            const response = await cartsDAO.findCartByID(id)

            if (!response.error) {
                let total = 0;
                response.products.forEach(element => total += Number(element.itemPrice));
                const object = {...response._doc, total}
                return object
            } else {
                return { cartID: 'El carrito no existe' }
            }
            
        } catch (error) {
            res.send('Something went wrong :/')
        }
    }

    getCarts = async () => {
        try {
            const data = await cartsDAO.getCarts()
            return data
        } catch (error) {
            return 'Something went wrong :/'
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

export const cartsController = new CartsController()