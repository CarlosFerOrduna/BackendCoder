import chai from 'chai'
import supertest from 'supertest'
import { v4 } from 'uuid'

const expect = chai.expect
const requester = supertest('http://localhost:8080/api')

describe('Test rutas products', function () {
    let pid
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

    describe('POST /api/products', function () {
        it('crear un producto', async function () {
            const { status, body } = await requester
                .post('/products')
                .set('authorization', token)
                .send({
                    title: 'test',
                    description: 'test',
                    price: 2000,
                    stock: 100,
                    category: 'test',
                    code: `test${v4()}`
                })

            expect(status).to.equal(201)
            expect(body).to.have.property('data')

            pid = body.data._id
        })

        it('envio un body invalido', async function () {
            const { status, body } = await requester
                .post('/products')
                .set('authorization', token)
                .send({
                    title: 1,
                    description: 1,
                    price: 'test',
                    stock: 'test',
                    category: 1,
                    code: 'abc123'
                })

            expect(status).to.equal(400)
            expect(body).to.have.property('error')
        })
    })

    describe('GET /api/products/{pid}', async function () {
        it('ortener un producto', async function () {
            const { status, body } = await requester
                .get(`/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('producto no encontrado', async function () {
            const { status, body } = await requester
                .get(`/products/${pid}12345678/products/${pid.slice(0, -8)}`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })

    describe('PUT /api/products/{pid}', async function () {
        it('modificar un productos', async function () {
            const { status, body } = await requester
                .put(`/products/${pid}`)
                .set('authorization', token)
                .send({ title: `test${v4()}` })

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })

        it('producto no existe', async function () {
            const { status, body } = await requester
                .put(`/products/${pid.slice(0, -8)}12345678`)
                .set('authorization', token)
                .send({ title: `test${v4()}` })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        it('envio un body invalido', async function () {
            const { status, body } = await requester
                .post('/products')
                .set('authorization', token)
                .send({
                    title: 1,
                    description: 1,
                    price: 'test',
                    stock: 'test',
                    category: 1,
                    code: 'abc123'
                })

            expect(status).to.equal(400)
            expect(body).to.have.property('error')
        })
    })

    describe('DELETE /api/products/{pid}', function () {
        it('elimino un producto', async function () {
            const { status, body } = await requester
                .delete(`/products/${pid}`)
                .set('authorization', token)

            expect(status).to.equal(204)
            expect(body).to.be.empty
        })

        it('producto no existe', async function () {
            const { status, body } = await requester
                .delete(`/products/${pid.slice(0, -8)}12345678`)
                .set('authorization', token)

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })
    })
})
