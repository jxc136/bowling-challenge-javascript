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

  it ('Correctly scores a spare into an open frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(6, 4);
    const frame2 = new Frame(5, 2);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    expect(frame1.bonusStatus()).toEqual(true);
    // scorecard.calculateBonuses();
    scoreCard.resolveSpare();
    const expectedFrame1 = { rollOne: 6, rollTwo: 4, frameTotal: 15, isStrike: false, isSpare: true, bonusStatus: false };
    const expectedFrame2 = { rollOne: 5, rollTwo: 2, frameTotal: 7, isStrike: false, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })

  it ('Correctly scores a spare into an strike', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(5, 5);
    const frame2 = new Frame(10, 0)
    const frame3 = new Frame(0, 0)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    expect(frame1.bonusStatus()).toEqual(true);
    // scorecard.calculateBonuses();
    scoreCard.resolveSpare();
    const expectedFrame1 = { rollOne: 5, rollTwo: 5, frameTotal: 20, isStrike: false, isSpare: true, bonusStatus: false };
    const expectedFrame2 = { rollOne: 10, rollTwo: 0, frameTotal: 10, isStrike: true, isSpare: false, bonusStatus: true };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })

  it ('adds no bonus to a gutter frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(3, 7);
    const frame2 = new Frame(0, 0)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    // scorecard.calculateBonuses();
    scoreCard.resolveSpare();
    const expectedFrame1 = { rollOne: 3, rollTwo: 7, frameTotal: 10, isStrike: false, isSpare: true, bonusStatus: false };
    const expectedFrame2 = { rollOne: 0, rollTwo: 0, frameTotal: 0, isStrike: false, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })
})


    
    