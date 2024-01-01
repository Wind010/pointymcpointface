const Session = require('../../src/models/session');
const {User, InvalidPointsValue} = require('../../src/models/user');
const Story = require('../../src/models/story');


describe('Session Class', () => {
  let session;
  let user;

  beforeEach(() => {
    user = new User('John', 'spartan_117@test.com');
    session = new Session('sessionId', user, 'Planning Session', 'Description');
  });

  test('Constructor initializes session correctly', () => {
    expect(session.id).toBe('sessionId');
    expect(session.owner).toBe(user);
    expect(session.name).toBe('Planning Session');
    expect(session.description).toBe('Description');
    expect(session.story).toBeNull();
    expect(session.users).toEqual({});
  });

  test('setStory sets story correctly', () => {
    expectedStory = new Story("story", "blah blah blah");
    session.setStory(expectedStory);
    expect(session.story).toBe(expectedStory);
  });

  test('creatorCanEstimate creator is added to users', () => {
    expect(Object.keys(session.users).length).toBe(0);
    session.creatorCanEstimate();
    expect(session.users[user.id]).toBe(user);
  });


  test('addUser adds and removes user correctly', () => {
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    expect(session.users[newUser.id]).toBe(newUser);
    session.removeUser(newUser);
    expect(session.users[newUser]).toBeUndefined();
  });
 
  test('addEstimate user estimates with valid points', () => {
    expected_estimation = 3;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, expected_estimation);
    expect(newUser.estimate).toBe(expected_estimation);
  });


  test('addEstimate user estimates with invalid points', () => {
    expected_estimation = 4;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    const sut = () => {
        session.addEstimate(newUser.id, expected_estimation);
    };
    expect(sut).toThrow(RangeError);
    expect(sut).toThrow(InvalidPointsValue);
  });


  test('getUsersWithEstimations all users estimated', () => {
    expected_estimation = 3;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, expected_estimation);
    const estimated = session.getUsersWithEstimations();
    expect(estimated).toEqual([newUser].map(({ id, name }) => ({ id, name })));
  });


  test('getUsersWithEstimations not all users estimated', () => {
    expected_estimation = 3;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, expected_estimation);
    session.creatorCanEstimate();
    const estimated = session.getUsersWithEstimations();
    expect(estimated).toEqual([newUser].map(({ id, name }) => ({ id, name })));
  });

  test('revealEstimates all users estimated', () => {
    expected_estimation = 3;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, expected_estimation);
    session.creatorCanEstimate();
    session.addEstimate(user.id, 5);
    const estimates = session.revealEstimates();
    expect(estimates).toEqual(Object.values(session.users).map(({ id, name, estimate }) => ({ id, name, estimate})));
  });


  test('revealEstimates not all users estimated', () => {
    expected_estimation = 3;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, expected_estimation);
    session.creatorCanEstimate();
    const estimates = session.revealEstimates();
    expect(estimates).toEqual({});
  });


  test('getEstimationAverage not all users estimated', () => {
    estimate1 = 3, estimate2 = 5;
    session.setStory(new Story("story", "blah blah blah"));
    const newUser = new User('Cortana', 'cortana@test.com');
    session.addUser(newUser);
    session.addEstimate(newUser.id, estimate1);
    session.creatorCanEstimate();
    session.addEstimate(user.id, estimate2);
    const estimateAverage = session.getEstimationAverage();
    expect(estimateAverage).toBe((estimate1 + estimate2)/2);
  });


});
