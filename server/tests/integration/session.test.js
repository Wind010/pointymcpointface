const request = require('supertest');
const app = require('../../server'); 

describe('Planning Poker Session API Endpoints', () => {
  it('Should create a new planning poker session', async () => {
    const response = await request(app)
      .post('/api/session')
      .set('Accept', 'application/json')
      .send({name: "test"});

    expect(response.statusCode).toBe(201); 
    expect(response.body.id).not.toBeNull();
    expect(response.body.id).not.toBeUndefined();
  });


});
