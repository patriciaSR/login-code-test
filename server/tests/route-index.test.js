const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)


it('Gets the test endpoint', async () => {
  const response = await request.get('/')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('OK')
})