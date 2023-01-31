import chai from 'chai'
import request from 'supertest'
import ProductsFileDAO from '../persistence/daos/file/products.dao.js'

const expect = chai.expect
const productsDAO = new ProductsFileDAO('./fileDB/products.json')

describe('Prueba de funciones del DAO Productos', () => {
    describe('Prueba método getAll()', () => {
        let data = before(async () => await productsDAO.getAll().then(response => data = response))
        it('Tipo de respuesta: Array', () => expect(data).to.be.a('array'))
    })

    describe('Prueba método save()', () => {
        let data = before(async () => await productsDAO.save({ name: 'Testing product', price: '100', photo: 'http://' }).then(response => data = response))
        it('Tipo de respuesta: Object', () => expect(data).to.be.a('object'))
        it('La respuesta no es erronea', () => expect(data).not.to.have.property('error'))
    })

    describe('Prueba método getByID()', () => {
        let data = before(async () => await productsDAO.getByID(4).then(response => data = response))
        it('Tipo de respuesta: Object', () => expect(data).to.be.a('object'))
        it('La respuesta no es erronea', () => expect(data).not.to.have.property('error'))
        it('La respuesta devuelve las keys esperadas', () => expect(data).to.have.all.keys(['id', 'name', 'price', 'photo']))
    })

    describe('Prueba método updateByID()', () => {
        const newData = { name: 'Testing product', price: '500', photo: 'http://' }
        let data = before(async () => await productsDAO.updateByID(4, newData).then(response => data = response))
        it('Tipo de respuesta: Object', () => expect(data).to.be.a('object'))
        it('La respuesta no es erronea', () => expect(data).not.to.have.property('error'))
    })

    describe('Prueba método deleteByID()', () => {
        let data = before(async () => await productsDAO.deleteByID(4).then(response => data = response))
        it('Tipo de respuesta: Object', () => expect(data).to.be.a('object'))
        it('La respuesta no es erronea', () => expect(data).not.to.have.property('error'))
    })

    // describe('Prueba método deleteAll()', () => {
    //     let data = before(async () => await productsDAO.deleteAll().then(response => data = response))
    //     it('Tipo de respuesta: Object', () => expect(data).to.be.a('object'))
    //     it('La respuesta no es erronea', () => expect(data).not.to.have.property('error'))
    // })
})

describe('Prueba de endpoints de productos', () => {
    describe('Método GET de "/"', () => {
        let response = before(async () => response = await request('http://localhost:8080').get('/'))
        it('Estado de la petición 200', () => expect(response.status).to.equal(200))
    })

    describe('Método GET de "/products"', () => {
        let response = before(async () => response = await request('http://localhost:8080').get('/products'))
        it('Estado de la petición 200', () => expect(response.status).to.equal(200))
    })
})