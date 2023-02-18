export const usersModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'username', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'address', type: 'string' },
    { name: 'age', type: 'string' },
    { name: 'areacode', type: 'string' },
    { name: 'telephone', type: 'string' },
    { name: 'avatar', type: 'string' },
    { name: 'cartID', type: 'string' },
    { name: 'password', type: 'string' }
]