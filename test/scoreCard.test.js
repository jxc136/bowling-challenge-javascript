const Scorecard = require('../lib/scorecard')
const Frame = require('../lib/frame');

describe ('ScoreCard', () => {

  it ('Correctly adds a frame', () => {
    const scorecard = new Scorecard();
    const frame = new Frame(5, 3);
    scorecard.add(frame);
    const testScorecard =  { rollOne: 5, rollTwo: 3, frameTotal: 8, isStrike: false, isSpare: false, bonusStatus:false }
    expect(scorecard.displayScore()).toContainEqual(testScorecard);
  })
})


    
    