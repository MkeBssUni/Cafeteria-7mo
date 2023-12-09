import { ReceiptProductsDto } from "../../modules/orders/adapters/dto";

export const generateReceiptDetailsTemplate = (products: ReceiptProductsDto[]): string => {
    let receiptDetails: string = '';
    for (let i = 0; i < products.length; i++) {
        receiptDetails += `
        <table border="0" cellpadding="10" cellspacing="0"
            class="paragraph_block block-5" role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
            width="100%">
            <tr>
                <td class="pad">
                    <div
                        style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                        <p style="margin: 0;">
                            <strong>Categoría:</strong> ${products[i].category}<br />
                            <strong>Producto:</strong> ${products[i].name}<br />
                            <strong>Cantidad:</strong> ${products[i].quantity}<br />
                            <strong>Precio:</strong> $${products[i].price}<br />
                            <strong>Subtotal:</strong> $${products[i].subtotal}<br />
                            <span
                                style="background-color: #ffffff;"><strong><span
                                        style="color: #e44545;">Descuento:
                                        $${products[i].discount ? (products[i].discount!*-1) : '0.00'}
                            </span>
                            </strong></span><br /><strong>Total:
                            </strong> ${products[i].total}</p>
                    </div>
                </td>
            </tr>
        </table>
        <table border="0" cellpadding="10" cellspacing="0"
		    class="divider_block block-6" role="presentation"
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
                <table border="0" cellpadding="10" cellspacing="0"
                class="divider_block block-6" role="presentation"
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
            </table></tr>
            </table>
            </div>
            </td>
            </tr>
            </table>
        `
    }
    return receiptDetails;
}