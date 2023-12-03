import { ResponseApi } from "./types";

const errors:{[x: string]: ResponseApi<undefined>}={
    'Bad Request': {code:400, error: true, message:'Bad Request'},
    'Already exists': {code: 400, error: true, message: 'Already exists'},
    'Missing fields': {code: 400, error: true, message: 'Missing fields'},
    'Invalid name': {code: 400, error: true, message: 'Invalid name'},
    'Invalid phone number': {code: 400, error: true, message: 'Invalid phone number'},
    'Invalid email': {code: 400, error: true, message: 'Invalid email'},
    'Invalid postal code': {code: 400, error: true, message: 'Invalid postal code'},
    'Invalid address number': {code: 400, error: true, message: 'Invalid address number'},
    'Invalid status': {code: 400, error: true, message: 'Invalid status'},
    'Invalid id': {code: 400, error: true, message: 'Invalid id'},
    'Invalid image': {code: 400, error: true, message: 'Invalid image'},
    'Invalid price': {code: 400, error: true, message: 'Invalid price, the price must be greater than 0'},
    'Invalid discount type': {code: 400, error: true, message: 'Invalid discount type'},
    'Invalid description': {code: 400, error: true, message: 'Invalid description'},
    'Invalid percentage': {code: 400, error: true, message: 'Invalid percentage'},
    'Invalid quantity': {code: 400, error: true, message: 'Invalid quantity'},
    'Invalid date': {code: 400, error: true, message: 'Invalid date'},
    'Invalid dates': {code: 400, error: true, message: 'Invalid dates'},
    'Description too short': {code: 400, error: true, message: 'Description too short'},
    'Expired Token': {code: 401, error: true, message: 'Expired Token'},
    'Unauthorized': {code: 401, error: true, message: 'Unauthorized'},
    'Forbidden': {code: 403, error: true, message: 'Forbidden'},
    'Not found': {code: 404, error: true, message: 'Not found'},
    'Category not found': {code: 404, error: true, message: 'Category not found'},
    'Product not found': {code: 404, error: true, message: 'Product not found'},
    'Discount not found': {code: 500, error: true, message: 'Discount not found'},
    'Server Error': {code: 500, error: true, message: 'Internal Server Error'},
    'Default': {code: 500, error: true, message: 'Internal Server Error'}
}

export const validateError = (error: Error): ResponseApi<undefined> => {
    return errors[error.message] || errors['Default'];
}