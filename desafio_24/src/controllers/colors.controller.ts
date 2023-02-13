import { Context } from 'oak'
import { ColorPayload } from '@interfaces/Color.ts'
import { getColors, saveColor} from '@daos/colors/colors.memory.dao.ts'

export const getColorsController = async (ctx: Context) => {
    const colors = await getColors()
    ctx.response.body = colors
}

export const saveColorController = async(ctx: Context) => {
    const body: ColorPayload = await ctx.request.body().value
    const newColor = await saveColor(body)
    ctx.response.status = 201
    ctx.response.body = newColor
}