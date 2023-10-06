import { faker } from '@faker-js/faker'
import { ProductModel } from '../dao/models/products.model.js'

export const save = async () => {
    for (let i = 0; i < 20000; i++) {
        const product = new ProductModel({
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: `abc${i}`,
            price: faker.commerce.price(),
            status: true,
            stock: faker.number.int({ max: 100 }),
            category: faker.commerce.productAdjective()
        })

        await product.save()
    }
}
