export const productsModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'name', type: 'string' },
    { name: 'price', type: 'string' },
    { name: 'photo', type: 'string' },
    { name: 'category', type: 'string' }
]