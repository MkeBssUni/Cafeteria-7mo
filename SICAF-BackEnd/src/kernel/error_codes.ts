import { ResponseApi } from "./types";

const errors:{[x: string]: ResponseApi<undefined>}={
    'Bad Request': {code:400, error: true, message:'Bad Request'},
    'Already exists': {code: 400, error: true, message: 'Already exists'},
    'Missing fields': {code: 400, error: true, message: 'Missing fields'},
    'Invalid name': {code: 400, error: true, message: 'Invalid name'},
    'Invalid lastname': {code: 400, error: true, message: 'Invalid lastname'},
    'Invalid gender': {code: 400, error: true, message: 'Invalid gender'},
    'Invalid role': {code: 400, error: true, message: 'Invalid role'},
    'Invalid phone number': {code: 400, error: true, message: 'Invalid phone number'},
    'Invalid email': {code: 400, error: true, message: 'Invalid email'},
    'Email already exists': {code: 400, error: true, message: 'Email already exists'},
    'Invalid postal code': {code: 400, error: true, message: 'Invalid postal code'},
    'Invalid password': {code: 400, error: true, message: 'Invalid password'},
    'Invalid address number': {code: 400, error: true, message: 'Invalid address number'},
    'Invalid status': {code: 400, error: true, message: 'Invalid status'},
    'Invalid id': {code: 400, error: true, message: 'Invalid id'},
    'Invalid role id': {code: 400, error: true, message: 'Invalid role id'},
    'Invalid image': {code: 400, error: true, message: 'Invalid image'},
    'Invalid price': {code: 400, error: true, message: 'Invalid price, the price must be greater than 0'},
    'Invalid discount type': {code: 400, error: true, message: 'Invalid discount type'},
    'Invalid description': {code: 400, error: true, message: 'Invalid description'},
    'Invalid percentage': {code: 400, error: true, message: 'Invalid percentage'},
    'Invalid quantity': {code: 400, error: true, message: 'Invalid quantity'},
    'Invalid date': {code: 400, error: true, message: 'Invalid date'},
    'Invalid dates': {code: 400, error: true, message: 'Invalid dates'},
    'Invalid payment method': {code: 400, error: true, message: 'Invalid payment method'},
    'Invalid comment': {code: 400, error: true, message: 'Invalid comment'},
    'Description too short': {code: 400, error: true, message: 'Description too short'},
    'Discount not applicable': {code: 400, error: true, message: 'Discount not applicable'},
    'Invalid token': {code: 401, error: true, message: 'Invalid token'},
    'Expired Token': {code: 401, error: true, message: 'Expired Token'},
    'Unauthorized': {code: 401, error: true, message: 'Unauthorized'},
    'Incorrect credentials': {code: 401, error: true, message: 'Incorrect credentials'},
    'Forbidden': {code: 403, error: true, message: 'Forbidden'},
    'Not found': {code: 404, error: true, message: 'Not found'},
    'Category not found': {code: 404, error: true, message: 'Category not found'},
    'Product not found': {code: 404, error: true, message: 'Product not found'},
    'Discount not found': {code: 500, error: true, message: 'Discount not found'},
    'Error generating receipt': {code: 500, error: true, message: 'Error generating receipt'},
    'Error sending email': {code: 500, error: true, message: 'Error sending email'},
    'Server Error': {code: 500, error: true, message: 'Internal Server Error'},
    'Default': {code: 500, error: true, message: 'Internal Server Error'}
}

export const validateError = (error: Error): ResponseApi<undefined> => {
    return errors[error.message] || errors['Default'];
}