const request = require('supertest');
const app = require('../../server'); 

describe('Planning Poker Session API Endpoints', () => {
  // Test for creating a new planning poker session
  it('Should create a new planning poker session', async () => {
    const response = await request(app)
      .post('/api/session')
      .set('Accept', 'application/json')
      .send({name: "test"});

    expect(response.statusCode).toBe(201); // Assuming the success status code is 200
    // Add more assertions based on the expected response
  });

  // Test for joining a session
  it('Should join a session', async () => {
    const sessionId = 'yourSessionId'; // Replace with an actual session ID
    const response = await request(app)
      .put(`/api/session/${sessionId}`)
      .send(/* Add your request body here if required */);

    expect(response.statusCode).toBe(200); // Assuming the success status code is 200
    // Add more assertions based on the expected response
  });

  // Test for creating a user
  it('Should create a user', async () => {
    const response = await request(app)
      .post('/user')
      .send(/* Add your request body here if required */);

    expect(response.statusCode).toBe(200); // Assuming the success status code is 200
    // Add more assertions based on the expected response
  });

  // Test for estimating a task
  it('Should estimate a task', async () => {
    const sessionId = 'yourSessionId'; // Replace with an actual session ID
    const storyId = 'yourStoryId'; // Replace with an actual story ID
    const response = await request(app)
      .post(`/estimate/${sessionId}/${storyId}`)
      .send(/* Add your request body here if required */);

    expect(response.statusCode).toBe(200); // Assuming the success status code is 200
    // Add more assertions based on the expected response
  });

  // Test for revealing task estimates
  it('Should reveal task estimates', async () => {
    const sessionId = 'yourSessionId'; // Replace with an actual session ID
    const taskId = 'yourTaskId'; // Replace with an actual task ID
    const response = await request(app)
      .get(`/revealEstimates/${sessionId}/${taskId}`);

    expect(response.statusCode).toBe(200); // Assuming the success status code is 200
    // Add more assertions based on the expected response
  });
});
