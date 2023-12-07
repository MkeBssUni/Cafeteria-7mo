import { transporter } from "../config/emailconfig";
import { forgotPasswordTemplate } from "./templates/ForgotPasswodTemplate";
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