export const types = `
    type Query {
        getProducts: [Product]
    }

    type Mutation {
        createProduct(input: CreateProductInput): Product
    }

    type Product {
        id: ID
        name: String
        price: Int
        photo: String
    }

    input CreateProductInput {
        name: String
        price: Int
        photo: String
    }
`