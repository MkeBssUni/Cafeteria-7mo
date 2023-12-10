import moment from "moment";
import { FilterDto } from "../modules/orders/adapters/dto";

export const isValidName =(input: String): boolean=>{
    const regex = new RegExp(`^[a-zA-ZáéíóúÁÉÍÓÚÑñ. ]{3,}$`,`u`);
    return regex.test(input.trim())
}

export const validateStringLength = (input: string, minLength: number, maxLength: number): boolean => {
    return input.trim().length >= minLength && input.trim().length <= maxLength;
}

export const isValidPhone = (input: String): boolean => {
    const regex = new RegExp(`^[0-9]{10}$`);
    return regex.test(input.trim());
}

export const isValidEmail = (input: String): boolean => {
    const regex = new RegExp(`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$`);
    return regex.test(input.trim());
}

export const isValidPassword = (input: String): boolean => {
    const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])`);
    return regex.test(input.trim());
}

export const isValidGender = (input: String): boolean => {
    const regex = new RegExp(`^[MFO]$`);
    return regex.test(input.trim().toUpperCase());

}

export const isValidPostalCode = (input: String): boolean => {
    const regex = new RegExp(`^[0-9]{5}$`);
    return regex.test(input.trim());
}

export const validateDates = (start_date: Date, end_date: Date): boolean => {
    const today = new Date();
    return today >= start_date && today <= end_date;
}

export const validateDate = (start_date: Date): boolean => {
    const today = new Date();
    return today >= start_date;
}

export const validateEmail = (email: string): boolean => {
    const regex = new RegExp(`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$`);
    return regex.test(email.trim());
}

export const validateFilter = (payload: FilterDto): boolean => {
    const today = moment().toDate();
    switch (payload.filter) {
        case 'day':
            if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.value!)) return false;
            const date = moment(payload.value, 'YYYY-MM-DD').toDate();
            if (date.toString() === 'Invalid Date') return false;
            if (date > today) return false;
            break;
        case 'month':
            if (!/^\d{4}-\d{2}$/.test(payload.value!)) return false;
            const month = moment(payload.value, 'YYYY-MM').toDate();
            if (month.toString() === 'Invalid Date') return false;
            if (month > today) return false;
            break;
        case 'year':
            if (!/^\d{4}$/.test(payload.value!)) return false;
            const year = moment(payload.value, 'YYYY').toDate();
            if (year.toString() === 'Invalid Date') return false;
            if (year > today) return false;
            break;
        default:
            break;
    }
    return true;
}