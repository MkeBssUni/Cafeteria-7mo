export type SaveUser = {
    email: string;
    password: string;
    role_id: number;
    dark_theme: boolean;
    letter_size: 'Grande' | 'Mediana' | 'Pequeña'; // Asumiendo que letter_size es un enum o una lista fija de opciones
    reset_token?: string;
    status: boolean;
    created_at: Date;
    code?: string;
}