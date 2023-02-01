import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})