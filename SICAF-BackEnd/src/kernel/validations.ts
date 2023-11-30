export const isValidName =(input: String): boolean=>{
    const regex = new RegExp(`^[a-zA-ZáéíóúÁÉÍÓÚÑñ. ]{3,}$`,`u`);
    return regex.test(input.trim())
}

export const validateStringLength = (input: string, minLength: number, maxLength: number): boolean => {
    return input.trim().length >= minLength && input.trim().length <= maxLength;
}