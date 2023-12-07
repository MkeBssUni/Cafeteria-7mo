import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const PORT_MAIL: string = process.env.PORT_EMAIL || '2525';

export const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: parseInt(PORT_MAIL.toString()),
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify().then(() => {
    console.log('Email configuration completed')
}).catch(error => {
    console.log(error)
});