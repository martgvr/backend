import { Color, ColorMap } from '@interfaces/Color.ts'

const colors: ColorMap = { }

export const getColors = (): Promise<Color[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const colorsList = Object.values(colors)
            resolve(colorsList)
        }, 1000);
    })
}

export const saveColor = (color: Color): Promise<Color> => {
    const id = crypto.randomUUID()
    const newColor: Color = {...color, id}
    
    colors[id] = newColor
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colors[id])
        }, 1000);
    })
}