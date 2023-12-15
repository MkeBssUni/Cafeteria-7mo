import { DiscountEmailDto } from "../../../modules/discounts/adapters/dto";
import { DiscountTypes } from "../../enums";

export const generateTypeValidationTemplate = (discount: DiscountEmailDto) => {
    switch (discount.type) {
        case DiscountTypes.discountByRol: 
            return `
                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                <p style="margin: 0;"><strong><em>${discount.percentage}% de descuento válido únicamente para usuarios de nuestro sistema que desempeñen el rol de ${discount.rol?.toLowerCase()}</em></strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                <p style="margin: 0;">${discount.description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        case DiscountTypes.discountByOrderTotal:
            return `
                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                <p style="margin: 0;"><strong><em>${discount.percentage}% de descuento válido únicamente en compras mayores de $${(discount.amount!)-1}</em></strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                <p style="margin: 0;">${discount.description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        case DiscountTypes.discountByCategory:
            return `
                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                <p style="margin: 0;">${discount.percentage}% de descuento válido únicamente en la compra de los productos pertenecientes a la categoría <strong><em>"${discount.category}"</em></strong>.</p>
                            </div>
                        </td>
                    </tr>
                </table><!--[if mso]><style>#list-r1c0m5 ul{ margin: 0 !important; padding: 0 !important; } #list-r1c0m5 ul li{ mso-special-format: bullet; }#list-r1c0m5 .levelOne li { margin-top: 0 !important; } #list-r1c0m5 .levelOne { margin-left: -20px !important; }</style><![endif]-->
                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                <p style="margin: 0;">${discount.description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        case DiscountTypes.discountByProduct:
            let productList = '';
            for (let i = 0; i < discount.products!.length; i++) {
                productList += `
                    <li style="margin-bottom: 0; text-align: left;">${discount.products![i].name} <span style="text-decoration: line-through;">$${discount.products![i].price}</span> <strong><span style="color: #e44545;">$${(discount.products![i].price) - (discount.products![i].price * (discount.percentage! / 100))}</span></strong></li>                
                `;
            }
            return `
                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                <p style="margin: 0;">${discount.percentage}% de descuento válido únicamente en la compra de los siguientes productos:</p>
                            </div>
                        </td>
                    </tr>
                </table><!--[if mso]><style>#list-r1c0m5 ul{ margin: 0 !important; padding: 0 !important; } #list-r1c0m5 ul li{ mso-special-format: bullet; }#list-r1c0m5 .levelOne li { margin-top: 0 !important; } #list-r1c0m5 .levelOne { margin-left: -20px !important; }</style><![endif]-->
                <table class="list_block block-6" id="list-r1c0m5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div class="levelOne" style="margin-left: 0;">
                                <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; list-style-position: inside; padding-left: 0; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Cabin,Arial,'Helvetica Neue',Helvetica,sans-serif; font-size: 18px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 21.599999999999998px; list-style-type: disc;">
                                    ${productList}
                                </ul>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                <p style="margin: 0;">${discount.description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        case DiscountTypes.discountByProductsTotal:
            let products = '';
            for (let i = 0; i < discount.products!.length; i++) {
                products += `
                    <li style="margin-bottom: 0; text-align: left;">${discount.products![i].name} <span style="text-decoration: line-through;">$${discount.products![i].price}</span> <strong><span style="color: #e44545;">$${(discount.products![i].price) - (discount.products![i].price * (discount.percentage! / 100))}</span></strong></li>                
                `;
            }
            return `
                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                <p style="margin: 0;">${discount.percentage}% de descuento válido únicamente en la compra de ${discount.quantity} de los siguientes productos:</p>
                            </div>
                        </td>
                    </tr>
                </table><!--[if mso]><style>#list-r1c0m5 ul{ margin: 0 !important; padding: 0 !important; } #list-r1c0m5 ul li{ mso-special-format: bullet; }#list-r1c0m5 .levelOne li { margin-top: 0 !important; } #list-r1c0m5 .levelOne { margin-left: -20px !important; }</style><![endif]-->
                <table class="list_block block-6" id="list-r1c0m5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div class="levelOne" style="margin-left: 0;">
                                <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; list-style-position: inside; padding-left: 0; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Cabin,Arial,'Helvetica Neue',Helvetica,sans-serif; font-size: 18px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 21.599999999999998px; list-style-type: disc;">
                                    ${products}
                                </ul>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                    <tr>
                        <td class="pad">
                            <div style="color:#101112;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                <p style="margin: 0;">${discount.description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        default:
            return '';
    }
}