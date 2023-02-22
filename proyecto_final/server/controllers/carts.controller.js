import { cartsDAO } from "../persistence/daos/factory.js"

export default class CartsController {
    // CORREGIR ESTE MÉTODO Y EL BOTON QUE LO EJECUTA, TIENE QUE SUMAR AL TOTAL CADA ELEMENTO AGREGADO
    saveData = async (req, res) => cartsDAO.addItemToCart(req.user.cartID, req.body.product).then(response => res.send(response))
    
    // LISTOS
    getData = async (req, res) => cartsDAO.findCartByID(req.user.data.cartID).then(response => res.render('cart', { dataDTO: response, user: req.user }))
    clearCartByID = async (req, res) => cartsDAO.clearCart(req.params.cartid).then(response => res.send(response))

    cartCheckout = async (req, res) => {
        try {
            cartsDAO.findCartByID(req.user.cartID).then(response => {
                const cartRepoInstance = new cartsRepository(response, req.user)
                cartsDAO.clearCart(req.user.cartID)
                cartRepoInstance.sendEmail()
            })
        } catch (error) {
            res.send('Something went wrong')
        }
    }
}