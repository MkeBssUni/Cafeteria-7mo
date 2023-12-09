export const enum Roles {
    admin = 'Administrador',
    employee = 'Empleado',
    client = 'Cliente'
}

export const enum DiscountTypes {
    discountByRol = 'Descuento por rol',
    discountByOrderTotal = 'Descuento por total de la compra',
    discountByProductsTotal = 'Descuento por cantidad de productos',
    discountByProduct = 'Descuento por producto',
    discountByCategory = 'Descuento por categoria'
}

export const enum OrderTypes {
    presential = 'Presencial',
    online = 'En linea'
}

export const enum OrderStatus {
    pending = 'Pendiente',
    preparation = 'En preparacion',
    completed = 'Completada',
    canceled = 'Cancelada'
}

export const enum PaymentMethods {
    cash = 'Efectivo',
    creditCard = 'Tarjeta de credito',
    debitCard = 'Tarjeta de debito'
}