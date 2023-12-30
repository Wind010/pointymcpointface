const roles = require('./roles'); // Import roles enumeration


class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = roles.USER;
    }
    
    
    getDetails() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        role: this.role,
      };
    }
  
    assignRole(role) {
        if (! roles.includes(role)) {
            throw new Error('Invalid role!');
        }

        this.role = role
    }
  }
  
  module.exports = User;