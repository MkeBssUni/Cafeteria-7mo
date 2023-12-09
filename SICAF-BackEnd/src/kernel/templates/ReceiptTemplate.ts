import { SendReceiptDto } from "../../modules/orders/adapters/dto";
import { generateReceiptDetailsTemplate } from "./ReceiptDetailsTemplate";

export const receiptTemplate = (payload: SendReceiptDto) => (
    `<!DOCTYPE html>

    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    
    <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@100;200;300;400;500;600;700;800;900"
            rel="stylesheet" type="text/css" /><!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:620px) {
                .desktop_hide table.icons-inner {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .row-content {
                    width: 100% !important;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
            <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;"
                                            width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="divider_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="100%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 2px solid #744C24;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;"
                                            width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 40px; padding-top: 40px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px">
                                                                        <div style="max-width: 120px;"><img
                                                                                src="data:image/webp;base64,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"
                                                                                style="display: block; height: auto; border: 0; width: 100%;"
                                                                                width="120" /></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="30" cellspacing="0"
                                                            class="heading_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h1
                                                                        style="margin: 0; color: #44270b; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 33.6px;">
                                                                        <span class="tinyMce-placeholder">¡Gracias por tu
                                                                            compra!</span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="heading_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h3
                                                                        style="margin: 0; color: #44270b; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 20px; font-weight: 600; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;">
                                                                        <span class="tinyMce-placeholder">Detalles de tu
                                                                            compra</span></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="divider_block block-4" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="100%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 2px dotted #9B6B43;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        ${generateReceiptDetailsTemplate(payload.products)}
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="paragraph_block block-7" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                                                        <p style="margin: 0;"><strong>Subtotal:
                                                                            </strong>$${payload.subtotal}<br /><span
                                                                                style="color: #e44545;"><strong>Descuento:
                                                                                    -$${payload.discount ? (payload.discount*-1) : '0.00'}</strong></span><br /><strong>Total:
                                                                            </strong>$${payload.total}</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                            role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;"
                                            width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="10" cellspacing="0"
                                                            class="divider_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div align="center" class="alignment">
                                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                                            role="presentation"
                                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                            width="100%">
                                                                            <tr>
                                                                                <td class="divider_inner"
                                                                                    style="font-size: 1px; line-height: 1px; border-top: 2px solid #9B6B43;">
                                                                                    <span> </span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>`
);