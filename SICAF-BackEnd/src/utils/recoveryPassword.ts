import nodemiler, { Transporter } from 'nodemailer';

export const sendEmail = async (to: string, code: string) => {
    try {
        const transporter: Transporter = nodemiler.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_MAIL,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            requireTLS: true
        });
        const mailOptions = {
            from: process.env.EMAIL_MAIL,
            to: to,
            subject: 'RECUPERACIÓN DE CONTRASEÑA',
            text: `Su código de verificación es: ${code}`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Código de Verificación</title>
                <style>
                /* Estilos generales */
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
            
                /* Contenedor principal */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
            
                /* Encabezado */
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
            
                .header h1 {
                    color: #333;  
                }
            
                /* Código de verificación */
                .verification-code {
                    background-color: #f2f2f2;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }
            
                .verification-code h2 {
                    color: #333;
                    font-size: 24px;
                    margin: 0;
                }
            
                .verification-code p {
                    color: #666;
                    font-size: 18px;
                    margin: 0;
                }
            
                /* Pie de página */
                .footer {
                    background-color: #f2f2f2;
                    padding: 10px;
                    text-align: center;
                }
            
                .footer p {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="header">
                    <h1>Código de Verificación</h1>
                </div>
            
                <div class="verification-code">
                    <p>A continuación, se muestra tu código de verificación: </p>
                    <p><strong>${code}</strong></p>
                </div>
            
                <div class="footer">
                    <p>Este correo ha sido generado automáticamente. Por favor, no respondas a este correo.</p>
                </div>
                </div>
            </body>
            </html>`
        }

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error("Error sending email");
    }
}