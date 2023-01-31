import fs from 'fs'

export default class FileContainer {
    constructor(path) {
        this.path = path
    }

    async getAll() {
        try {            
            const data = await this.#readFile()
            return data
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async save(object) {
        try {            
            const data = await this.#readFile()
            const id = await this.#getId()
            const newData = { id, ...object }
            data.push(newData)
            await fs.promises.writeFile(this.path, JSON.stringify(data))
            return newData
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async getByID(ID) {
        try {
            const data = await this.#readFile()

            if (data.length === 0) {
                return { error: 'Database seems to be empty' }
            }
            
            const dataFind = data.find(u => u.id === ID)
            return dataFind
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteByID(ID) {
        try {
            const data = await this.#readFile()
            const index = await this.#getIndex(ID)

            if (index !== -1) {
                data.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(data))
                return { message: 'The object has been successfully deleted', id: ID }
            }

            return { error: 'Object not found', id: ID }
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(this.path)
            return { message: 'Database has been deleted successfully' }
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async updateByID(ID, obj) {
        try {
            const data = await this.#readFile()
            const index = await this.#getIndex(ID)

            if (data.length !== 0) {
                if (index !== -1) {
                    const newData = { ...data[index], ...obj }
                    data.splice(index, 1, newData)
                    await fs.promises.writeFile(this.path, JSON.stringify(data))
                    return newData   
                } 
            } else {
                return { error: 'Database seems to be empty' }
            }

            return { error: 'Object not found', id: ID }
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
    
    #readFile = async () => {
        if (fs.existsSync(this.path)) {
            const usersFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(usersFile)
        } else {
            return []
        }
    }

    #getIndex = async (id) => {
        try {            
            const users = await this.#readFile()
            return users.findIndex(user => user.id === id)
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    #getId = async () => {
        try {            
            let id
            const users = await this.#readFile()
            if (users.length === 0) {
                id = 1
            } else {
                id = users[users.length - 1].id + 1
            }
    
            return id
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
}