export const isValidName =(input: String): boolean=>{
    const regex = new RegExp(`^[a-zA-ZáéíóúÁÉÍÓÚÑñ. ]{3,}$`,`u`);
    return regex.test(input.trim())
}