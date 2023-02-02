import cartsRepository from '../persistence/repositories/carts.repository.js'
import { cartsDAO } from '../persistence/daos/factory.js'

class CartsController {
    getCartByID = async (id) => {
        try {
            const data = await cartsDAO.findCartByID(id)
            return data
        } catch (error) {
            return { cartID: 'Algo salió mal' }
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

    postCart = async (input) => {
        try {
            const { cartID, itemID, itemName, itemPrice, itemPhoto } = input
            await cartsDAO.addItemToCart(cartID, itemID, itemName, itemPrice, itemPhoto)
        } catch (error) {
            res.send('Something went wrong :/')
        }
    }

    clearCartByID = async (id) => {
        try {
            cartsDAO.clearCart(id)
        } catch (error) {
            return 'Something went wrong :/'
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