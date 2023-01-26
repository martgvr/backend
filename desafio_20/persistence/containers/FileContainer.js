import fs from 'fs'

// Agregar try y catch
export default class FileContainer {
    constructor(path) {
        this.path = path
    }

    async getAll() {
        try {            
            const users = await this.#readFile()
            return users
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async save(user) {
        try {            
            const users = await this.#readFile()
            const id = await this.#getId()
            const newUser = { id, ...user }
            users.push(newUser)
            await fs.promises.writeFile(this.path, JSON.stringify(users))
            return newUser
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async getByID(userID) {
        try {
            const users = await this.#readFile()
            const user = users.find(u => u.id === userID)
            return user
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteByID(userID) {
        try {
            const users = await this.#readFile()
            const index = await this.#getIndex(userID)
            users.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(users))
            return userID
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(this.path)
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }

    async updateByID(userID, obj) {
        try {
            const users = await this.#readFile()
            const index = await this.#getIndex(userID)
            const newUser = { ...users[index], ...obj }
            users.splice(index, 1, newUser)
            await fs.promises.writeFile(this.path, JSON.stringify(users))
            return newUser
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