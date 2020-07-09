const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Login', () => {
  it('authenticates using a valid email and password', async () => {
    const response = await request
      .post('/auth')
      .send({email: 'hello@email.com', password: 'hello1234'});

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('xxxxxxx');
    expect(response.body.user.email).toBe('hello@email.com');
  });

  it('returns error authentication using an invalid email', async () => {
    const response = await request
      .post('/auth')
      .send({email: 'invalid@email.com', password: 'hello1234'});

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Usuario o contraseña incorrectos');
  });

  it('returns error authentication using an invalid password', async () => {
    const response = await request
      .post('/auth')
      .send({email: 'hello@email.com', password: 'invalid'});

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Usuario o contraseña incorrectos');
  });
});

describe('Logout', () => {
  it('deletes the token if token exists', async () => {
    const response = await request
      .delete('/auth/xxxxxxx');

    expect(response.status).toBe(200);
  });

  it('does not delete the token if token not exists', async () => {
    const response = await request
      .delete('/auth');

    expect(response.status).toBe(400);
  });
});

