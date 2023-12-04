export const codeRecovery = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const string_length = 10;

    let randomstring = '';

    for (let i=0; i<string_length; i++) {
        let indice = Math.floor(Math.random() * chars.length);
        randomstring += chars.charAt(indice);
    }

    return randomstring;
}