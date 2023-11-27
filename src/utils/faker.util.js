import { faker } from '@faker-js/faker'

export const generateProductMock = async () => {
    return new Promise((resolve, reject) => {
        try {
            const thumbnails = []
            for (let i = 0; i < faker.number.int({ min: 0, max: 4 }); i++) {
                thumbnails.push(faker.image.avatar())
            }

            resolve({
                _id: faker.database.mongodbObjectId(),
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                code: faker.commerce.isbn(10),
                price: faker.commerce.price({ min: 100, max: 200, dec: 2, symbol: '$' }),
                status: faker.datatype.boolean({ probability: 0.1 }),
                stock: faker.number.int({ min: 0, max: 25 }),
                category: faker.commerce.productAdjective(),
                thumbnails
            })
        } catch (error) {
            reject(error)
        }
    })
}
