import { Color, ColorMap, ColorPayload } from '@interfaces/Color.ts'

const colors: ColorMap = { }

export const getColors = (): Promise<Color[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const colorsList = Object.values(colors)
            resolve(colorsList)
        }, 1000);
    })
}

export const saveColor = (colorPayload: ColorPayload): Promise<Color> => {
    const id = crypto.randomUUID()
    const newColor: Color = {
        id: id,
        isActive: true,
        ...colorPayload
    }
    colors[id] = newColor
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colors[id])
        }, 1000);
    })
}