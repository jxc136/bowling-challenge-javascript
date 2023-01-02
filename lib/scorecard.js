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

  resolveStrike() {
    // Resolves strike bonuses for each frame
    this.score.forEach((frame, index) => {
      if (frame['isStrike'] && frame['bonusStatus']) {
        // Calculate the bonus for this frame by adding the rolls of the next two frames
        let nextFrame = this.score[index + 1];
        let nextNextFrame = this.score[index + 2];
        if (nextFrame['isStrike'] ) {
          frame['frameTotal'] += (nextFrame['rollOne'] + nextNextFrame['rollOne']);
        } else {
          frame['frameTotal']+= (nextFrame['rollOne']) + (nextFrame['rollTwo'])
        };
      }
      frame['bonusStatus'] = false;
    });
  }



  resolveSpare() {
    // resolves spare bonuses for each frame
    this.score.forEach((frame, index) => {
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
    this.resolveStrike();
  }

  displayScore(){
    // returns score after bonuses are calculated 
    return this.score;
  }

  finalFrameBonus(bonusRoll){
    if (this.score.length === 10 && this.score[9].isSpare) {
      this.score[9]['frameTotal'] += (bonusRoll.displayRollOne())
    } else if (this.score.length === 10 && this.score[9]['isStrike']){
      this.score[9]['frameTotal'] += (bonusRoll.displayRollOne() + bonusRoll.displayRollTwo())
    } else {
      throw new Error('bonus rolls can only be added to the 10th frame');
    }
    this.score[9]['bonusStatus'] = false;
  }

  finalScore(){
    // returns the final game score
  }
}

module.exports = ScoreCard;