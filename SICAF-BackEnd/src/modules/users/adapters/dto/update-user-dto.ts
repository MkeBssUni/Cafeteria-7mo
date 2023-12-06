export type UpdateUserDto = {
    user_id?: number,
    email: string,
    role_id: number,
    person:{
        person_id: number,
        user_id: number,
        name: string,
        lastname: string,
        gender: 'M' | 'F',
        birthday?: Date,
        phone_number1: string,
        phone_number2?: string,
        address:{
            id: number,
            street: String,
            settlement: String,
            external_number?: String,
            internal_number?: String,
            city: String,
            state: String,
            postal_code: String,
            country: String,
        }
    }
}