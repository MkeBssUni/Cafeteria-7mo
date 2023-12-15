import { transporter } from "../config/emailconfig";
import { forgotPasswordTemplate } from "./templates/ForgotPasswodTemplate";
import { receiptTemplate } from "./templates/ReceiptTemplate";
import { discountTemplate } from "./templates/discountTemplates/DiscountTemplate";
import { ResponseEmail } from "./types";

export const sendForgotPasswordEmail = async (payload: ResponseEmail<string>): Promise<boolean> => {
    try {
        const email = await transporter.sendMail({
            from: `SICAF <${process.env.EMAIL_ADDRESS}>`,
            to: payload.email,
            subject: 'Recuperación de contraseña',
            html: forgotPasswordTemplate(payload.url!)
        });
        transporter.close();
        return email.accepted.length > 0;
    } catch (e) {
        return false;
    }
}

export const sendReceiptEmail = async (payload: ResponseEmail<string>): Promise<boolean> => {
    try {
        const email = await transporter.sendMail({
            from: `SICAF <${process.env.EMAIL_ADDRESS}>`,
            to: payload.email,
            subject: 'Recibo de compra',
            html: receiptTemplate(payload.receipt!)
        });
        transporter.close();
        return email.accepted.length > 0;
    } catch (e) {
        return false;
    }
}

export const sendDiscountsEmail = async (payload: ResponseEmail<string>): Promise<boolean> => {
    try {
        const email = await transporter.sendMail({
            from: `SICAF <${process.env.EMAIL_ADDRESS}>`,
            to: payload.emails,
            subject: 'Nuevo descuento',
            html: discountTemplate(payload.discount!)
        });
        transporter.close();
        return email.accepted.length > 0;
    } catch (e) {
        return false;
    }
}