import { ResponseApi } from "./types";

const errors:{[x: string]: ResponseApi<undefined>}={
    'Bad Request': {code:400, error: true, message:'Bad Request'},
    'Already exists': {code: 400, error: true, message: 'Already exists'},
    'Expired Token': {code: 401, error: true, message: 'Expired Token'},
    'Unauthorized': {code: 401, error: true, message: 'Unauthorized'},
    'Forbidden': {code: 403, error: true, message: 'Forbidden'},
    'Not found': {code: 404, error: true, message: 'Not found'},
    'Server Error': {code: 500, error: true, message: 'Internal Server Error'},
    'Default': {code: 500, error: true, message: 'Internal Server Error'}
}

export const validateError = (error: Error): ResponseApi<undefined> => {
    return errors[error.message] || errors['Default'];
}