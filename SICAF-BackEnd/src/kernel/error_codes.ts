import { ResponseApi } from "./types";

const errors:{[x: string]: ResponseApi<undefined>}={
    'Bad Request': {code:400, error: true, message:'Bad Request'},
    'Already exists': {code: 400, error: true, message: 'Already exists'},
    'Missing fields': {code: 400, error: true, message: 'Missing fields'},
    'Invalid name': {code: 400, error: true, message: 'Invalid name'},
    'Invalid status': {code: 400, error: true, message: 'Invalid status'},
    'Invalid id': {code: 400, error: true, message: 'Invalid id'},
    'Invalid image': {code: 400, error: true, message: 'Invalid image'},
    'Invalid price': {code: 400, error: true, message: 'Invalid price, the price must be greater than 0'},
    'Description too short': {code: 400, error: true, message: 'Description too short'},
    'Expired Token': {code: 401, error: true, message: 'Expired Token'},
    'Unauthorized': {code: 401, error: true, message: 'Unauthorized'},
    'Forbidden': {code: 403, error: true, message: 'Forbidden'},
    'Not found': {code: 404, error: true, message: 'Not found'},
    'Category not found': {code: 404, error: true, message: 'Category not found'},
    'Product not found': {code: 404, error: true, message: 'Product not found'},
    'Server Error': {code: 500, error: true, message: 'Internal Server Error'},
    'Default': {code: 500, error: true, message: 'Internal Server Error'}
}

export const validateError = (error: Error): ResponseApi<undefined> => {
    return errors[error.message] || errors['Default'];
}