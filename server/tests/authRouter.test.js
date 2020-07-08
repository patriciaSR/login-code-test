const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)


it('authenticates using a valid email and password', async () => {
  const response = await request
    .post('/auth')
    .send({username: 'hello@email.com', password: 'hello1234'})

  expect(response.status).toBe(200)
  expect(response.body.token).toBe('xxxxxxx')
  expect(response.body.user.email).toBe('hello@email.com')
})
