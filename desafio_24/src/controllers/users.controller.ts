import { Context, helpers } from 'oak'
import { User, UserPayload } from '@interfaces/User.ts'
import { getUsers, getUserByID, createUser } from '@daos/user/user.mem.dao.ts'

export const getUsersController = async (ctx: Context) => {
    const users = await getUsers()
    ctx.response.body = users
}

export const getUserByIDController = async (ctx: Context) => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true })
    try {
        const user: User = await getUserByID(id)
        ctx.response.body = user
    } catch (error) {
        ctx.response.status = 404
        ctx.response.body = { error }
    }
}

export const createUserController = async(ctx: Context) => {
    const body: UserPayload = await ctx.request.body().value
    const newUser = await createUser(body)
    ctx.response.status = 201
    ctx.response.body = newUser
}