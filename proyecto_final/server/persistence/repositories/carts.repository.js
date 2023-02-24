import { transporter } from '../../utils/nodemailer.js'

export default class cartsRepository {
    constructor(itemsData, user) {
        this.itemsData = itemsData
        this.user = user
    }

    sendEmail() {
        let emailContent = `
                            <h1>Gracias por tu compra ${this.user.name}!</h1>
                            <h4>Tu compra está en camino</h4>

                            <table style="width: 50%; text-align: center;">
                                <tr>
                                    <th>Item</th>
                                    <th>Precio unitario</th>
                                </tr>
                            `

        this.itemsData.products.forEach(element => {
            emailContent += `   <tr>
                                    <td>${element.itemName}</td>
                                    <td>${element.itemPrice}</td>
                                </tr>
                            `
        })
        
        emailContent += `   </table>
                            <br>
                            <p><b>Total</b>: $ ${this.itemsData.total}</>
                            <p><b>Dirección</b>: ${this.user.address}</p>
                            <p><b>Teléfono</b>: ${this.user.telephone}</p>
                        `

        transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `${this.user.name} <${this.user.email}>`,
            subject: 'Compra realizada con éxito!',
            html: emailContent
        })

        emailContent = `    <h1>Se realizó una compra</h1>
                            <h3>El usuario ${this.user.name} (${this.user.email}) realizó la siguiente compra:</h3>
                            
                            <table style="width: 50%; text-align: center;">
                            <tr>
                                <th>Item</th>
                                <th>Precio unitario</th>
                            </tr>
                        `

        this.itemsData.products.forEach(element => {
            emailContent += `   <tr>
                                    <td>${element.itemName}</td>
                                    <td>${element.itemPrice}</td>
                                </tr>
                            `
        })

        emailContent += `   </table>
                            <br>
                            <p><b>Total</b>: $ ${this.itemsData.total}</>
                            <p><b>Dirección</b>: ${this.user.address}</p>
                            <p><b>Teléfono</b>: ${this.user.telephone}</p>
                        `
                        
        transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `Administrador <${process.env.ADMIN_EMAIL}>`,
            subject: '[ADMIN] - Se realizó una compra',
            html: emailContent
        })
    }
}