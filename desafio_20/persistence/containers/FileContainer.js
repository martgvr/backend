import fs from 'fs'

// Agregar try y catch
export default class FileContainer {
    constructor(path) {
        this.path = path
    }

    async getAll() {
        const users = await this.#readFile()
        return users
    }

    async save(user) {
        const users = await this.#readFile()
        const id = await this.#getId()
        const newUser = { id, ...user }
        users.push(newUser)
        await fs.promises.writeFile(this.path, JSON.stringify(users))
        return newUser
    }

    async getById(userId) {
        const users = await this.#readFile()
        const user = users.find(u => u.id === userId)
        return user
    }

    async deleteById(userId) {
        const users = await this.#readFile()
        const index = await this.#getIndex(userId)
        users.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(users))
        return userId
    }

    async deleteAll() {
        await fs.promises.unlink(this.path)
    }

    async updateById(userId, obj) {
        const users = await this.#readFile()
        const index = await this.#getIndex(userId)
        const newUser = { ...users[index], ...obj }
        users.splice(index, 1, newUser)
        await fs.promises.writeFile(this.path, JSON.stringify(users))
        return newUser
    }

    // Métodos privados para ser usados únicamente en la clase
    #readFile = async () => {
        if (fs.existsSync(this.path)) {
            const usersFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(usersFile)
        } else {
            return []
        }
    }

    #getIndex = async (id) => {
        const users = await this.#readFile()
        return users.findIndex(user => user.id === id)
    }

    #getId = async () => {
        const users = await this.#readFile()
        if (users.length === 0) {
            id = 1
        } else {
            id = users[users.length - 1].id + 1
        }

        return id
    }
}