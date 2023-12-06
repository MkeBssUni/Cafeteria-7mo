export type GetUserDto = {
    id: number,
    email: string,
    password?: string,
    role: string,
    dark_theme: boolean,
    letter_size: number,
    status: string,
}