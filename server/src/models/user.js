const config = require('../../config');
const Roles = require('./roles'); // Import roles enumeration
const unique = require('../common/unique');
const {isValidPoint} = require('./points')

const InvalidPointsValue = "Invalid points value!"

class User {
    constructor(name, email='', role = Roles.USER) {
      this.id = unique.generateRandomId(config.idCharacterSet, config.sessionIdLength);
      this.name = name || (() => { throw new Error("Name is required."); })();
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
      if (! isValidPoint(estimate)) {
        throw new RangeError('Invalid points value!')
      }
 
      if (this.role === Roles.OBSERVER) {
        console.log(`Roles was set to ${this.role}.  No estimate set.`);
        return;
      }
      
      this.estimate = estimate;
    }

    assignRole(role) {
        if (! Object.values(Roles).includes(role)) {
            throw new Error('Invalid role!');
        }

        this.role = role
    }

    clone() {
      // This will not handle circular references, functions or non-serializable values (undefined).
      // Could use lodash.cloneDeep.
      //const deepCopy = Json.Parse(JSON.stringify(this));

      // We just care about a few properties for now.
      return new User(this.name, this.email);
    }
  }
  
  module.exports = {User, InvalidPointsValue};