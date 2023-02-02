export const types = `
    type Query {
        getProducts: [Product]
        getCarts: [Carts]
        getCartByID(id: ID): CartByID
        clearCart(id: ID): Message
        
    }

    type Mutation {
        createProduct(input: CreateProductInput): Product
        postCart(input: postCartInput): Message
        cartCheckout(input: cartCheckoutInput): Message
    }

    input cartCheckoutInput {
        id: ID
        name: String
        email: String
        address: String
        areacode: String
        telephone: String
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
        total: Int
        products: [CartProducts]
    }

    type CartProducts {
        itemID: ID
        itemName: String
        itemPrice: String
        itemPhoto: String
    }

    type Message {
        message: String
    }

    input CreateProductInput {
        name: String
        price: Int
        photo: String
    }

    input postCartInput {
        cartID: String
        itemID: ID
        itemName: String
        itemPrice: String
        itemPhoto: String
    }
`