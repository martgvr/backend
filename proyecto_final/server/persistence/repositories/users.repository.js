import { transporter } from '../../utils/nodemailer.js'

export default class usersRepository {
    constructor(newUser) {
        this.newUser = newUser
    }

    async sendEmail() {
        let emailContent =    `
                                <h1>Información de usuario:</h1>
                                <p>Hola ${this.newUser.name}</p>
                                <p>Tu correo es: ${this.newUser.email}</p>
                                <h4>Gracias por registrarte en nuestra tienda</h4>
                                `

        await transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `${this.newUser.name} <${this.newUser.email}>`,
            subject: 'Registro exitoso',
            html: emailContent
        })

        emailContent =      `<h1>Nuevo usuario registrado</h1>
                            <p>Nombre de usuario: ${this.newUser.username}</p>
                            <p>Nombre y Apellido: ${this.newUser.name}</p>
                            <p>Dirección: ${this.newUser.address}</p>
                            <p>Edad: ${this.newUser.age}</p>
                            <p>Teléfono: ${this.newUser.areacode} ${this.newUser.telephone}</p>
                            <p>ID de carrito: ${this.newUser.cartID}</p>`

        await transporter.sendMail({
            from: 'Gorilla IT Solutions <gorilla.notifications@gmail.com>',
            to: `Administrador <${process.env.ADMIN_EMAIL}>`,
            subject: '[ADMIN] - Nuevo usuario registrado',
            html: emailContent
        })
    }
}