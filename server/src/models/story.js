class Story {
    constructor(id, name, description = '') {
      this.id = id;
      this.name = name;
      this.description = description;
      this.estimate = null; 
    }
  
    setEstimate(estimate) {
      this.estimate = estimate;
    }
  
    getDetails() {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        estimate: this.estimate,
      };
    }
  }
  
  module.exports = Story;