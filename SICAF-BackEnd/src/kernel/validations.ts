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