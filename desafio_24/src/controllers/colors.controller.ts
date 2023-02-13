import { Context } from 'oak'
import { UserPayload } from '@interfaces/Color.ts'
import { getColors, saveColor} from '@daos/user/colors.memory.dao.ts'

export const getUsersController = async (ctx: Context) => {
    const users = await getColors()
    ctx.response.body = users
}

export const createUserController = async(ctx: Context) => {
    const body: UserPayload = await ctx.request.body().value
    const newUser = await saveColor(body)
    ctx.response.status = 201
    ctx.response.body = newUser
}