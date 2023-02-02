import FileContainer from "../../containers/FileContainer.js";
import fs from 'fs'

export default class CartsFileDAO extends FileContainer {
    constructor(path) {
        super(path)
    }

    async getCarts() {
        try {
            const data = await this.#readFile()
            return data
        } catch (error) {
            return { error: 'Algo salió mal' }
        }
    }

    async findCartByID(cartID) {
        try {
            const data = await this.#readFile()
            if (data.length === 0) { return { error: 'Database seems to be empty' }}
            const dataFind = data.find(u => u.cartID === cartID)
            return dataFind
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async addItemToCart(cartID, itemID, itemName, itemPrice, itemPhoto) {
        const data = await this.#readFile()
        const index = await this.#getIndex(cartID)

        if (data.length !== 0) {
            if (index !== -1) {
                const newData = data[index].products.push({ itemID, itemName, itemPrice, itemPhoto })
                await fs.promises.writeFile(this.path, JSON.stringify(data))
                return newData   
            } 
        } else {
            return { error: 'Database seems to be empty' }
        }
    }

    async clearCart(cartID) {
        const data = await this.#readFile()
        const index = await this.#getIndex(cartID)

        if (data.length !== 0) {
            if (index !== -1) {
                const newData = data[index].products = []
                await fs.promises.writeFile(this.path, JSON.stringify(data))
                return newData   
            } 
        } else {
            return { error: 'Database seems to be empty' }
        }
    }


    #readFile = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } else {
            return []
        }
    }

    #getIndex = async (id) => {
        try {            
            const carts = await this.#readFile()
            return carts.findIndex(user => user.cartID === id)
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
}