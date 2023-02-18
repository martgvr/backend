export const cartsModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'cartID', type: 'string' },
    { name: 'products', type: 'string' },
    { name: 'total', type: 'string' }
]