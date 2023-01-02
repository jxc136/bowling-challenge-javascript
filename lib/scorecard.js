const Frame = require('./frame');

class ScoreCard {
  
  constructor(){
    this.score = []
  }

  add(Frame){
    // Arguement is an instance of the frame class
    // Adds the score class instance into the score array
    // this.calculateBonuses();
    this.score.push(Frame.frameToObject());
  }

  resolveStrike(){
    // resolves strike bonuses for each frame
  }

  resolveSpare() {
    // resolves spare bonuses for each frame
    this.score.forEach((frame, index) => {
      console.log(frame);
      if (frame['isSpare'] && frame['bonusStatus']) {
        const nextFrame = this.score[index + 1];
        frame['frameTotal'] += (nextFrame['rollOne']);
  
        frame['bonusStatus'] = false;
      }
    });
  }
  
  
  calculateBonuses(){
    // executes resolveSpare and resolveStrike
    this.resolveSpare();
  }

  displayScore(){
    // returns score after bonuses are calculated 
    return this.score;
  }

  finalFrameBonus(bonusRoll){
    // calculates bonuses for the final frame 
    // Accepts an instance of the BonusRoll class as an arguement
  }

  finalScore(){
    // returns the final game score
  }
}

module.exports = ScoreCard;