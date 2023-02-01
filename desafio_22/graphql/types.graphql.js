export const types = `
    type Query {
        getProducts: [Product]
        getCarts: [Carts]
        getCartByID(id: ID): CartByID
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

    type Carts {
        cartID: String
        products: [CartProducts]
    }

    type CartByID {
        cartID: String
        products: [CartProducts]
        total: Int
    }

    type CartProducts {
        itemID: ID
        itemName: String
        itemPrice: String
        itemPhoto: String
    }

    input CreateProductInput {
        name: String
        price: Int
        photo: String
    }
`