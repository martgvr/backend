export const ordersModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'products', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'timestamp', type: 'string' },
    { name: 'orderEmail', type: 'string' },
    { name: 'orderID', type: 'string' }
]