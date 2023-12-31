const config = require('../../config');
const Roles = require('./roles'); // Import roles enumeration
const unique = require('../common/unique');


class Session {
    constructor(id, user, name, description="") {
      this.id = id ?? unique.generateRandomId(config.idCharacterSet, config.sessionIdLength);
      
      if (! user) {
        throw new Error("UserId is required.");
      }
      
      user.assignRole(Roles.CREATOR);
      this.owner = user;
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
      // Could block Creator/Owner from estimating based off config.
      this.user[userId].estimate()
    }

    getUsersWithEstimations() {
      if (! this.story) {
        throw new Error('No story has been set in the session.');
      }
  
      if (this.users.length === 0) {
        throw new Error('No users in the session.');
      }

      // Could filter Creator/Owner from estimations based off config.
  
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