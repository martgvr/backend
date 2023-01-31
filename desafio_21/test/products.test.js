import chai from 'chai'
import request from 'supertest'
import ProductsFileDAO from '../persistence/daos/file/products.dao.js'

const expect = chai.expect
const productsDAO = new ProductsFileDAO('./fileDB/products.json')

describe('Prueba de funciones de la capa Productos', () => {
    
    describe('Prueba método getAll()', () => {
        let data = before(async () => await productsDAO.getAll().then(response => data = response))
        it('Tipo de respuesta: Array', () => expect(data).to.be.a('array'))
    })

    // console.log(data)
})