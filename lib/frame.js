class Frame {

  constructor(rollOne, rollTwo) {
    // Monitor the number of pins for each roll
    // Error handling will be handled in the frameTotal method
    this.rollOne = rollOne;
    this.rollTwo = rollTwo;
  }
  frameTotal() {

    if (this.rollOne + this.rollTwo > 10) {
      throw new Error('invalid score')
    } else {
      //  Returns total of the frame
      return (this.rollOne + this.rollTwo);
    }
  }

  isStrike() {
    if (this.rollOne === 10) {
      return true  
    } else {
      return false
    };
  }

  isSpare() {
    if ( this.rollOne + this.rollTwo === 10 && this.rollOne < 10 ) {
      return true 
    } else {
      return false
    };
  }

  bonusStatus() {
    // Marks if the frame has outstanding bonus points to be calculated
  }

  frameToObject() {
    // Adds all of the information about the frame into an object to be accessed by the scorecard
  }
};

module.exports = Frame;