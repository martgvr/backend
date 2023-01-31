import fs from 'fs'
import FileContainer from "../../containers/FileContainer.js";

export default class UsersFileDAO extends FileContainer {
    constructor(path) {
        super(path)
    }

    async find(username) {
        try {            
            const users = await this.#readFile()
            const user = users.find(u => u.username === username.username)
            return user === undefined ? [] : user
        } catch (error) {
            return { error: 'Algo salió mal' }
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
}