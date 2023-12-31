const request = require('supertest');
const app = require('../../server'); 

describe('Planning Poker User API Endpoints', () => {

  it('Should create a user', async () => {
    const response = await request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({name: 'Tester McTest'});

    expect(response.statusCode).toBe(201);
    expect(response.body.user.id).not.toBeNull();
    expect(response.body.user.id).not.toBeUndefined();
  });

});
