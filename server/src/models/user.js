const roles = require('./roles'); // Import roles enumeration
const unique = require('../common/unique');
const {isValidPoint} = require('./points')

class User {
    constructor(name, email='', role = roles.USER) {
      // TODO:  UserManager to that can resolve existing users.
      this.id = unique.id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.estimate = -1;
    }
    
    getUserDetails() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        role: this.role
      };
    }

    getEstimate() {
      return this.estimate;
    }
  
    setEstimate(estimate) {
      if (isValidPoint(estimate) && (this.role == roles.USER)) {
        this.estimate = estimate;
      }
    }

    assignRole(role) {
        if (! roles.includes(role)) {
            throw new Error('Invalid role!');
        }

        this.role = role
    }
  }
  
  module.exports = User;