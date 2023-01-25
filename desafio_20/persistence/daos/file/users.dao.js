import FileContainer from "../../containers/FileContainer.js";
import fs from 'fs'

export default class UsersFileDAO extends FileContainer {
    constructor(path) {
        super(path)
    }

    // agregar try y catch
    async find(username) {
        console.log('Buscando a: ', username.username);
        const users = await this.#readFile()
        const user = users.find(u => u.username === username.username)
        return user === undefined ? [] : user
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