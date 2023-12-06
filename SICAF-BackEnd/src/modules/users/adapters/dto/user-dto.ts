export type UserDto = {
    id?: number,
    email: string,
    password: string,
    role_id: number,
    dark_theme?: boolean,
    letter_size?: number,
    reset_token?: string,
    status?: boolean,
    created_at?: Date,
}