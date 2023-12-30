// Session.js - Sample model for a Planning Poker session
const roles = require('./roles'); // Import roles enumeration


class Session {
    constructor(id, name, description="") {
      this.id = id;
      this.name = name;
      this.description = description;
      this.story = null;
      this.users = {};
    }
  
    setStory(story) {
      this.story = story
    }
  
    addUser(user) {
      this.users[user.id] = user;
    }

    removeUser(userId) {
      delete this.users[userId];
    }

    addEstimate(userId) {
      this.user[userId].addEstimate()
    }

    getUsersWithEstimations() {
      if (! this.story) {
        throw new Error('No story has been set in the session.');
      }
  
      if (this.users.length === 0) {
        throw new Error('No users in the session.');
      }
  
      const usersWithEstimates = this.users.filter(user => user.estimate !== null);
      return usersWithEstimates.length === this.users.length;
    }

    revealEstimations() {
      if (! getUsersWithEstimations()) {
        console.log("Not all users have estimated.")
        return;
      }
      
      const userEstimates = users.map(user => {
        return {
          name: user.name,
          estimate: user.getEstimate()
        };
      });

      return userEstimates;
    }
}

module.exports = Session;