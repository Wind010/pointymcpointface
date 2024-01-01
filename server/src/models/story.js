class Story {
    constructor(name, description = '') {
      this.name = name;
      this.description = description;
    }
  
    getDetails() {
      return {
        name: this.name,
        description: this.description,
      };
    }
  }
  
  module.exports = Story;