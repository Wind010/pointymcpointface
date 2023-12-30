// Session.js - Sample model for a Planning Poker session

const short = require('short-uuid');
const roles = require('./roles'); // Import roles enumeration


class Session {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.story = null;
      this.users = [];
    }
  
    static findSessionById(sessionId) {
      // Implement logic to find and return session by ID from storage (e.g., database)
      // Example:
      // return SessionModel.findById(sessionId);
    }
  
    addSTory(story) {
      this.story = story
    }
  
    addUser(user) {
      this.users.push(user);
    }

}

module.exports = Session;