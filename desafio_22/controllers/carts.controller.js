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

    cartCheckout = async (input) => {
        const { id, name, email, address, areacode, telephone } = input
        const user = { name, email, address, areacode, telephone }
        
        try {
            const data = await cartsDAO.findCartByID(id)
            const cartRepoInstance = new cartsRepository(data, user)
            cartRepoInstance.sendEmail()
            cartsDAO.clearCart(id)
        } catch (error) {
            return 'Something went wrong :/'
        }
    }

}

export const cartsController = new CartsController()