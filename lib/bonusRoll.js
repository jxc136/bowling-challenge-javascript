class BonusRoll {
  // Handles bonus bonus rolls if the player gets a strike or spare in frame 10
  constructor(rollOne, rollTwo) {
    // Monitor the number of pins for each roll
    this.rollOne = rollOne;
    this.rollTwo = rollTwo;
  }

   displayRollOne() {
    return this.rollOne;
  }

  displayRollTwo() {
    return this.rollTwo;
  }
}
module.exports = BonusRoll; 