export interface ColorPayload {
    name: string,
    age: number
}

export interface Color {
    id: string,
    name: string,
    age: number,
    isActive: boolean
}

export interface ColorMap {
    [key: string]: Color
}