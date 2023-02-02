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

            if (data.length === 0) {
                return { error: 'Database seems to be empty' }
            }
    
            const dataFind = data.find(u => u.cartID === cartID)
            return dataFind
        } catch (error) {
            console.log(error)
            return { error: 'Algo salió mal' }
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
}