const config = require('../../config');
const Roles = require('./roles'); // Import roles enumeration
const unique = require('../common/unique');


class Session {

  /**
   * Constructor for Session class.
   * @param {string} id - The session ID.
   * @param {User} user - The owner/user of the session.
   * @param {string} name - The name of the session.
   * @param {string} [description=""] - The description of the session.
   */
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
  
   /**
   * The creator/owner of the session can vote.
   */
    creatorCanEstimate() {
      this.users[this.owner.id] = this.owner;
    }

    setStory(story) {
      this.story = story
    }
  
    addUser(user) {
      this.users[user.id] = user;
    }

    /**
   * Remove a user from the session.
   * @param {string} userId - The ID of the user to be removed.
   * @returns {boolean} - Indicates whether the user was successfully removed (true) or not found (false).
   */
    removeUser(userId) {
      if (this.users[userId]) {
        delete this.users[userId];
        return true; 
      }
      return false;
    }

    /**
   * Add point estimate for specified user.
   * @param {string} userId - The ID of the user to be removed.
   * @param {int} points - The point estimate matching value in Fibonacci sequence.
   */
    addEstimate(userId, points) {
      // Could block Creator/Owner from estimating based off config.
      this.users[userId].setEstimate(points)
    }

    /**
     * Get users who have estimated.
     * @param {string} userId - The ID of the user to be removed.
     * @returns {array} - An array of userIds that have estimates.
     */
    getUsersWithEstimations() {
      if (! this.story) {
        throw new Error('No story has been set in the session.');
      }
  
      if (this.users.length === 0) {
        throw new Error('No users in the session.');
      }

      // Could filter Creator/Owner from estimations based off config.
      
      const usersArray = Object.values(this.users);
      const usersWithEstimates = usersArray.filter(user => user.estimate && user.estimate > 0);
      // Destructure syntax to pull out the properties and construct a new object with those properties.
      return usersWithEstimates.map(({ id, name }) => ({ id, name }));
    }

    

    revealEstimations() {
      if (this.getUsersWithEstimations().length !== Object.keys(this.users).length) {
        console.log("Not all users have estimated.")
        return {};
      }
      
      const userEstimates = Object.values(this.users).map(user => {
        return {
          id: user.id,
          name: user.name,
          estimate: user.getEstimate()
        };
      });

      return userEstimates;
    }

    getEstimationAverage() {
      const sum = Object.values(this.users).reduce((accumulator, currentEstimation) => accumulator + currentEstimation, 0);
      return sum / this.users.length;
    }
}

module.exports = Session;