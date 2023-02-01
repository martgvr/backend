import { transporter } from '../../utils/nodemailer.js'

export default class cartsRepository {
    constructor(itemsData, user) {
        this.itemsData = itemsData
        this.user = user
    }

    sendEmail() {
        let total = 0
        this.itemsData.products.forEach(element => total += Number(element.itemPrice))

        let emailContent = `<h1>Gracias por tu compra ${this.user.name}!</h1><h4>Tu compra está en camino</h4>`
        this.itemsData.products.forEach(element => emailContent += `<p>Item: ${element.itemName} | Precio: ${element.itemPrice}</p>`)
        emailContent += `<br><p>Total: ${total}</p><p>Dirección: ${this.user.address}</p><p>Teléfono: ${this.user.telephone}</p>`

        transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `${this.user.name} <${this.user.email}>`,
            subject: 'Compra realizada con éxito!',
            html: emailContent
        })

        emailContent = `<h1>Se realizó una compra</h1><h3>El usuario ${this.user.name} (${this.user.email}) realizó la siguiente compra:</h3>`
        this.itemsData.products.forEach(element => emailContent += `<p>Item: ${element.itemName} | Precio: ${element.itemPrice}</p>`)
        emailContent += `<br><p>Total: ${total}</p><p>Dirección: ${this.user.address}</p><p>Teléfono: ${this.user.areacode} ${this.user.telephone}</p>`

        transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `Administrador <${process.env.ADMIN_EMAIL}>`,
            subject: '[ADMIN] - Se realizó una compra',
            html: emailContent
        })
    }
}