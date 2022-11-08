import { normalize, denormalize, schema } from 'normalizr';
import { data } from './data.js';
import { inspect } from 'util';

const empleadoEntity = new schema.Entity('empleado')

const empresaEntity = new schema.Entity('empresa', { 
    gerente: empleadoEntity,
    encargado: empleadoEntity,
    empleados: [empleadoEntity]
})

const empresaNormalized = normalize(data, empresaEntity);

const dataOriginal = JSON.stringify(data).length;
const dataNormalizada = JSON.stringify(empresaNormalized).length;
const dataAhorro = (((dataOriginal - dataNormalizada) / dataOriginal) * 100).toFixed(2)

console.log(inspect(empresaNormalized, false, 12, true));
console.log('Data original', dataOriginal);
console.log('Data normalizada', dataNormalizada);
console.log(`Ahorro: ${dataAhorro} %`);

const empresaDenormalized = denormalize(empresaNormalized, empresaEntity, empresaNormalized.entities)
console.log(`Data normalizada: ${JSON.stringify(empresaNormalized).length}`);
console.log(`Data desnormalizada: ${JSON.stringify(empresaDenormalized).length}`);
