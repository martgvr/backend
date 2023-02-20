export const messagesModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'text', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'username', type: 'string' },
    { name: 'timestamp', type: 'string' }
]