export const messagesModel = [
    { name: 'id', type: 'increments', props: [ 'primary', 'notNullable' ] },
    { name: 'text', type: 'string' },
    { name: 'author', type: 'string' },
    { name: 'timestamp', type: 'string' }
]