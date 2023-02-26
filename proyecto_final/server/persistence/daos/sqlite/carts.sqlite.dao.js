import SQLiteContainer from '../../containers/sqlite.container.js'
import cartsRepository from '../../repositories/carts.repository.js'

export default class CartsSQLiteDAO extends SQLiteContainer {
    constructor() {
        super('sqlite3', './sqlite/database.sqlite', 'carts')
    }

    async findCartByID(id) {
        try {
            const data = await this.db.from(this.table).select('*').where('cartID', id)
            const returnData = data[0]
            return { message: 'Query successfully resolved', data: returnData == undefined ? null : returnData }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async removeCartItem(cartID, itemID) {
        try {
            const findOne = await this.db.from(this.table).select('*').where('cartID', cartID)
            const parsedData = JSON.parse(findOne[0].products)
            const itemRemoveIndex = parsedData.findIndex(element => element.itemID == itemID)
            const itemToSubtract = parsedData[itemRemoveIndex].itemPrice
            const total = findOne[0].total

            parsedData.splice(itemRemoveIndex, 1)

            await this.db.from(this.table).select('*').where('cartID', cartID).update('products', JSON.stringify(parsedData)).update('total', total - itemToSubtract)

            return { message: 'Query successfully resolved' }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async addItemToCart(cartID, itemData) {
        const { itemID, itemName, itemPrice, itemPhoto } = itemData

        try {
            const findOne = await this.db.from(this.table).select('*').where('cartID', cartID)
            const products = JSON.parse(findOne[0].products)
            const total = findOne[0].total

            products.push({ itemID, itemName, itemPrice, itemPhoto })

            await this.db.from(this.table).select('*').where('cartID', cartID).update('products', JSON.stringify(products)).update('total', JSON.stringify(Number(total) + Number(itemPrice)))

            return { message: 'Query successfully resolved' }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async clearCart(cartID) {
        try {
            const data = await this.db.from(this.table).select('*').where('cartID', cartID).update('products', '[]').update('total', 0)
            return { message: 'Query successfully resolved', data }
        } catch (error) {
            return { error: 'Something went wrong' }
        }
    }

    async cartCheckout(cartID, userData) {
        try {
            this.findCartByID(cartID).then(response => {
                let responseData = response.data
                responseData.products = JSON.parse(responseData.products)

                const cartRepoInstance = new cartsRepository(responseData, userData.data)
                cartRepoInstance.sendEmail()
                this.clearCart(cartID)

            })

            return { message: 'Query successfully resolved' }
        } catch (error) {
            console.log(error);
            return { error: 'Something went wrong' }
        }
    }
}