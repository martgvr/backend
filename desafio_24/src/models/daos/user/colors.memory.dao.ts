import { User, UserMap, UserPayload } from '@interfaces/Color.ts'

const users: UserMap = { }

export const getColors = (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const usersList = Object.values(users)
            resolve(usersList)
        }, 1000);
    })
}

export const saveColor = (userPayload: UserPayload): Promise<User> => {
    const id = crypto.randomUUID()
    const newUser: User = {
        id: id,
        isActive: true,
        ...userPayload
    }
    users[id] = newUser
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users[id])
        }, 1000);
    })
}