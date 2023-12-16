import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080/api')

describe('Test rutas carts', function () {
    let cid
    let pid = '657650bbff170170cb9dbf8a'
    let token

    this.beforeEach(async function () {
        this.email = 'test@ecommerce.dev'
        this.password = 'test123'

        const { body } = await requester.post('/users/login').send({
            email: this.email,
            password: this.password
        })

        const { accessToken } = body
        token = accessToken
    })

    this.afterEach(async function () {
        await requester.post(`/users/logout`).set('authorization', token)
    })

    describe('POST /api/carts', function () {
        it('crear un carrito', async function () {
            const { status, body } = await requester.post('/carts').set('authorization', token)

            expect(status).to.equal(201)
            expect(body).to.have.property('data')

            cid = body.data._id
        })
    })

    describe('GET /api/carts/{cid}', async function () {
        it('obtener un carrito', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid}`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('carrito no encontrado', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid.slice(0, -8)}12345678`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('POST /api/carts/{cid}/products/{pid}', async function () {
        it('agregar un producto al carrito', async function () {
            const { status, body } = await requester
                .post(`/carts/${cid}/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(201)
            expect(body).to.have.property('data')
        })

        it('carrito no encontrado', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid.slice(0, -8)}12345678/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        it('producto no encontrado', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid}/products/${pid.slice(0, -8)}12345678`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('PUT /api/carts/{cid}', async function () {
        it('agregar un array de productos al carrito', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid}`)
                .set('authorization', token)
                .send({
                    products: [
                        { product: `${pid}` },
                        { product: '649227e384cf9a8cc6ce60e0' },
                        { product: '649227cb84cf9a8cc6ce5fd8' }
                    ]
                })

            expect(status).to.equal(201)
            expect(body).to.have.property('data')
        })

        it('carrito no existe', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid.slice(0, -8)}12345678`)
                .set('authorization', token)
                .send({
                    products: [
                        { product: `${pid}` },
                        { product: '649227e384cf9a8cc6ce60e0' },
                        { product: '649227cb84cf9a8cc6ce5fd8' }
                    ]
                })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        it('un producto no existe', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid}`)
                .set('authorization', token)
                .send({
                    products: [
                        { product: `${pid.slice(0, -8)}12345678` },
                        { product: '649227e384cf9a8cc6ce60e0' },
                        { product: '649227cb84cf9a8cc6ce5fd8' }
                    ]
                })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('PUT /api/carts/{cid}/products/{pid}', function () {
        it('cambio la cantidad de un producto en el carrito', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid}/products/${pid}`)
                .set('authorization', token)
                .send({ quantity: 15 })

            expect(status).to.equal(201)
            expect(body).to.have.property('data')
        })

        it('carrito no existe', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid.slice(0, -8)}12345678/products/${pid}`)
                .set('authorization', token)
                .send({ quantity: 15 })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        it('producto no existe', async function () {
            const { status, body } = await requester
                .put(`/carts/${cid}/products/${pid.slice(0, -8)}12345678`)
                .set('authorization', token)
                .send({ quantity: 15 })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('DELETE /api/carts/{cid}/products/{pid}', function () {
        it('elimino un producto del carrito', async function () {
            const { status, body } = await requester
                .delete(`/carts/${cid}/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('carrito no existe', async function () {
            const { status, body } = await requester
                .delete(`/carts/${cid.slice(0, -8)}12345678/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        it('producto no existe', async function () {
            const { status, body } = await requester
                .delete(`/carts/${cid}/products/${pid.slice(0, -8)}12345678`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('DELETE /api/carts/{cid}', function () {
        it('elimino todos los productos del carrito', async function () {
            const { status, body } = await requester
                .delete(`/carts/${cid}`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('carrito no existe', async function () {
            const { status, body } = await requester
                .delete(`/carts/${cid.slice(0, -8)}12345678`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('GET /api/carts/{cid}/purchase', function () {
        it('finalizo el proceso de compra', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid}/purchase`)
                .set('authorization', token)
            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('carrito no existe', async function () {
            const { status, body } = await requester
                .get(`/carts/${cid.slice(0, -8)}12345678/purchase`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })
})
