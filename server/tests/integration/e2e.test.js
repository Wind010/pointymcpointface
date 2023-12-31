const request = require('supertest');
const app = require('../../server'); 


let creatorUserId = "";
let userId = "";
let sessionId = "";

/**
 * API Tests - These tests must be run with --runInBand
 *
 * @group integration
 * @group e2e
 */
describe('Planning Poker API Endpoints', () => {
  
  test('Should create a user with Creator role.', async () => {
    const response = await request(app)
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send({name: 'Creator McTestFace'});

    creatorUserId = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(creatorUserId).not.toBeNull();
    expect(creatorUserId).not.toBeUndefined();
  }); 


  test('Should create a new planning poker session', async () => {
    const response = await request(app)
      .post('/api/session')
      .set('Content-Type', 'application/json')
      .send({userId: creatorUserId, name: "test"});

    sessionId = response.body.id;
    expect(response.statusCode).toBe(201); 
    expect(sessionId).not.toBeNull();
    expect(sessionId).not.toBeUndefined();
  });


  test('Should create a user with User role.', async () => {
    const response = await request(app)
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send({name: 'User McTestFace'});

    userId = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(userId).not.toBeNull();
    expect(userId).not.toBeUndefined();
  }); 


  it('Should join user to existing session', async () => {
    const response = await request(app)
      .put(`/api/session/${sessionId}`)
      .set('Content-Type', 'application/json')
      .send({"userId": userId});

    expect(response.statusCode).toBe(200);
  });


  it('Should estimate a story/item with user for 3 points', async () => {
    const expectedPoints = 3;
    const response = await request(app)
      .post(`/api/session/${sessionId}/estimate/`)
      .send({"userId": userId, points: expectedPoints});

    expect(response.statusCode).toBe(200); 
  });
  

  // it('Should reveal task estimates', async () => {
  //   const sessionId = 'yourSessionId'; // Replace with an actual session ID
  //   const taskId = 'yourTaskId'; // Replace with an actual task ID
  //   const response = await request(app)
  //     .get(`/revealEstimates/${sessionId}/${taskId}`);

  //   expect(response.statusCode).toBe(200); 
  // });


 

}, 30000);
