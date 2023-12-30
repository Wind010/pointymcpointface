const request = require('supertest');
const app = require('../../server'); 

describe('Planning Poker User API Endpoints', () => {

  // Test for creating a user
  it('Should create a user', async () => {
    const response = await request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({name: 'Tester McTest'});

    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBeNull();
    expect(response.body.id).not.toBeUndefined();
  });

});
