import moment from "moment";
import { DiscountEmailDto } from "../../../modules/discounts/adapters/dto";

export const generateDateValidationTemplate = (discount: DiscountEmailDto): string => {
    let validation: string = 'Apróvechalo desde hoy';
    if (discount.start_date && !discount.end_date) validation = `Válido desde el ${moment(discount.start_date).format('DD/MM/YYYY')}`;
    if (discount.start_date && discount.end_date && (discount.start_date !== discount.end_date)) validation = `Válido desde el ${moment(discount.start_date).format('DD/MM/YYYY')} hasta el ${moment(discount.end_date).format('DD/MM/YYYY')}`;
    if (discount.start_date && discount.end_date && (discount.start_date === discount.end_date)) validation = `Válido sólo el ${moment(discount.start_date).format('DD/MM/YYYY')}`;
    if (!discount.start_date && !discount.end_date) validation = `Aprovéchalo desde hoy`;
    
    return `    
        <table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
                <td class="pad">
                    <h3 style="margin: 0; color: #44270b; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 26.4px;">
                        <span class="tinyMce-placeholder">
                            ${validation}
                        </span>
                    </h3>
                </td>
            </tr>
        </table>
    `;
}