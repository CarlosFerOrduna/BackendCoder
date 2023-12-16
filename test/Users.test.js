import { faker } from '@faker-js/faker'
import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080/api')

describe('Test rutas users', function () {
    let email
    let password
    let token

    describe('POST /api/users/register', async function () {
        before(async function () {
            const roles = ['user', 'premium', 'admin']
            const index = faker.number.int({ min: 0, max: roles.length - 1 })
            this.rol = roles[index]
        })

        it('registro un nuevo usuario', async function () {
            const { status, body } = await requester.post('/users/register').send({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                rol: this.rol,
                age: faker.number.int({ min: 18, max: 80 }),
                password: faker.internet.password()
            })

            expect(status).to.equal(201)
            expect(body).to.have.property('data')

            const { data } = body
            email = data.email
            password = data.password
        })

        it('envio un body invalido', async function () {
            const { status, body } = await requester.post('/users/register').send({
                firstName: 1,
                lastName: 1,
                email: 1,
                rol: '',
                age: 'veintiocho',
                password: 123
            })

            expect(status).to.equal(400)
            expect(body).to.have.property('error')
        })
    })

    describe('POST /api/users/login', async function () {
        it('logueo un usuario', async function () {
            const { status, body } = await requester
                .post(`/users/login`)
                .send({ email, password })

            expect(status).to.equal(200)
            expect(body).to.have.property('user')

            const { accessToken } = body
            token = accessToken
        })

        it('usuario no encontrado', async function () {
            const { status, body } = await requester.post(`/users/login`).send({
                email: `${email}sarasa`,
                password: `${password}sarasa`
            })

            expect(status).to.equal(404)
            expect(body).to.have.property('error')
        })

        after(async function () {
            await requester.post(`/users/logout`).set('authorization', token)
        })
    })

    describe('PUT /api/users/premium/{id}', async function () {
        before(async function () {
            const { body } = await requester.post(`/users/login`).send({ email, password })

            const { accessToken, user } = body
            token = accessToken
            this.uid = user._id
        })

        it('cambio el rol del usuario', async function () {
            const { status, body } = await requester
                .put(`/users/premium/${this.uid}`)
                .set('authorization', token)

            expect(status).to.equal(201)
            expect(body).to.have.property('data')
        })

        after(async function () {
            await requester.post(`/users/logout`).set('authorization', token)
        })
    })

    describe('GET /api/users/current', async function () {
        before(async function () {
            const { body } = await requester.post(`/users/login`).send({ email, password })

            const { accessToken } = body
            token = accessToken
        })

        it('obtengo el usuario actual', async function () {
            const { status, body } = await requester
                .get(`/users/current`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('_id')
        })

        after(async function () {
            await requester.post(`/users/logout`).set('authorization', token)
        })
    })

    describe('POST /api/users/logout', async function () {
        before(async function () {
            const { body } = await requester.post(`/users/login`).send({ email, password })

            const { accessToken } = body
            token = accessToken
        })

        it('desloguear al usuario', async function () {
            const { status, body } = await requester
                .post(`/users/logout`)
                .set('authorization', token)

            expect(status).to.equal(200)
            expect(body).to.have.property('data')
        })
    })
})
