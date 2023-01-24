import CartMongoDAO from "../persistence/daos/cartMongoDAO.js"
import { transporter } from '../utils/nodemailer.js'

const cartsDB = new CartMongoDAO()

const getCart = async (req, res) => {
    try {
        cartsDB.findCartByID(req.user.cartID).then(response => {
            let total = 0;
            response.products.forEach(element => {
                total += Number(element.itemPrice);
            });
            res.render('cart', { data: response, user: req.user, total: total })
        })
    } catch (error) {
        res.send('Something went wrong :/')
    }
}

const postCart = async (req, res) => {
    try {
        cartsDB.addItemToCart(req.user.cartID, req.body.product).then(response => res.send(response))
    } catch (error) {
        res.send('Something went wrong :/')
    }
}

const cartCheckout = async (req, res) => {
    try {
        cartsDB.findCartByID(req.user.cartID).then(response => {
            let total = 0
            response.products.forEach(element => total += Number(element.itemPrice))
    
            let emailContent = `<h1>Gracias por tu compra ${req.user.name}!</h1><h4>Tu compra está en camino</h4>`
            response.products.forEach(element => emailContent += `<p>Item: ${element.itemName} | Precio: ${element.itemPrice}</p>`)
            emailContent += `<br><p>Total: ${total}</p><p>Dirección: ${req.user.address}</p><p>Teléfono: ${req.user.telephone}</p>`
    
            transporter.sendMail({
                from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
                to: `${req.user.name} <${req.user.email}>`,
                subject: 'Compra realizada con éxito!',
                html: emailContent
            })
    
            emailContent = `<h1>Se realizó una compra</h1><h3>El usuario ${req.user.name} (${req.user.email}) realizó la siguiente compra:</h3>`
            response.products.forEach(element => emailContent += `<p>Item: ${element.itemName} | Precio: ${element.itemPrice}</p>`)
            emailContent += `<br><p>Total: ${total}</p><p>Dirección: ${req.user.address}</p><p>Teléfono: ${req.user.areacode} ${req.user.telephone}</p>`
    
            transporter.sendMail({
                from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
                to: `Administrador <${process.env.ADMIN_EMAIL}>`,
                subject: '[ADMIN] - Se realizó una compra',
                html: emailContent
            })
    
            cartsDB.clearCart(req.user.cartID)
        })
    } catch (error) {
        res.send('Something went wrong :/')
    }
}

export default { getCart, postCart, cartCheckout }