import { faker } from '@faker-js/faker/locale/es'

export function mockProducts(quantity) {
    let productsArray = [];
    productsArray.push({ name: faker.commerce.product(), price: faker.commerce.price(), photo: faker.image.image() });

    if (quantity) {
        for (let i = 0; i < quantity - 1; i++) {
            const product = {
                'name': faker.commerce.product(),
                'price': faker.commerce.price(),
                'photo': faker.image.image()
            }
            productsArray.push(product);
        }
    }

    return productsArray;
}