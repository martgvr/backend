export interface ColorPayload {
    color: string
}

export interface Color {
    id: string,
    color: string
}

export interface ColorMap {
    [key: string]: Color
}