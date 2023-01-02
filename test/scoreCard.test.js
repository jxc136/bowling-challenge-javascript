const Scorecard = require('../lib/scorecard')
const Frame = require('../lib/frame');
const BonusRoll = require('../lib/bonusRoll')

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
    scoreCard.calculateBonuses();
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
    scoreCard.calculateBonuses();
    const expectedFrame1 = { rollOne: 5, rollTwo: 5, frameTotal: 20, isStrike: false, isSpare: true, bonusStatus: false };
    const expectedFrame2 = { rollOne: 10, rollTwo: 0, frameTotal: 10, isStrike: true, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })

  it ('adds no bonus to a gutter frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(3, 7);
    const frame2 = new Frame(0, 0)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.calculateBonuses();
    const expectedFrame1 = { rollOne: 3, rollTwo: 7, frameTotal: 10, isStrike: false, isSpare: true, bonusStatus: false };
    const expectedFrame2 = { rollOne: 0, rollTwo: 0, frameTotal: 0, isStrike: false, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })

  it ('correctly handles a strike into an open frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(10, 0);
    const frame2 = new Frame(7, 2)
    expect(frame1.bonusStatus()).toEqual(true)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.calculateBonuses();
    const expectedFrame1 = { rollOne: 10, rollTwo: 0, frameTotal: 19, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame2 = { rollOne: 7, rollTwo: 2, frameTotal: 9, isStrike: false, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })

  it ('correctly handles a strike into a spare', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(10, 0);
    const frame2 = new Frame(2, 8)
    const frame3 = new Frame(0, 0)
    expect(frame1.bonusStatus()).toEqual(true)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.calculateBonuses();
    const expectedFrame1 = { rollOne: 10, rollTwo: 0, frameTotal: 20, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame2 = { rollOne: 2, rollTwo: 8, frameTotal: 10, isStrike: false, isSpare: true, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
   
  })
  
  it ('correctly handles a strike into a strike into an open frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(10, 0);
    const frame2 = new Frame(10, 0)
    const frame3 = new Frame(3, 4)
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.calculateBonuses();
    scoreCard.resolveStrike();
    const expectedFrame1 = { rollOne: 10, rollTwo: 0, frameTotal: 23, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame2 = { rollOne: 10, rollTwo: 0, frameTotal: 17, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame3 = { rollOne: 3, rollTwo: 4, frameTotal: 7, isStrike: false, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame3);
   
  })

  it ('correctly handles 3 strikes in a row', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(10, 0);
    const frame2 = new Frame(10, 0);
    const frame3 = new Frame(10, 0);
    const frame4 = new Frame(0, 0);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.add(frame4);
    scoreCard.calculateBonuses();
    const expectedFrame1 = { rollOne: 10, rollTwo: 0, frameTotal: 30, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame2 = { rollOne: 10, rollTwo: 0, frameTotal: 20, isStrike: true, isSpare: false, bonusStatus: false };
    const expectedFrame3 = { rollOne: 10, rollTwo: 0, frameTotal: 10, isStrike: true, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame1);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame2);
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame3);
   
  })

  it ('correctly handles a spare in the final frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(0, 0);
    const frame2 = new Frame(0, 0);
    const frame3 = new Frame(0, 0);
    const frame4 = new Frame(0, 0);
    const frame5 = new Frame(0, 0);
    const frame6 = new Frame(0, 0);
    const frame7 = new Frame(0, 0);
    const frame8 = new Frame(0, 0);
    const frame9 = new Frame(0, 0);
    const frame10 = new Frame(0, 10);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.add(frame4);
    scoreCard.add(frame5);
    scoreCard.add(frame6);
    scoreCard.add(frame7);
    scoreCard.add(frame8);
    scoreCard.add(frame9);
    scoreCard.add(frame10);
    const bonusRoll = new BonusRoll(7, 0);
    scoreCard.finalFrameBonus(bonusRoll);
    const expectedFrame10 = { rollOne: 0, rollTwo: 10, frameTotal: 17, isStrike: false, isSpare: true, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame10);
  
  })

  it ('correctly handles a strike in the final frame', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(0, 0);
    const frame2 = new Frame(0, 0);
    const frame3 = new Frame(0, 0);
    const frame4 = new Frame(0, 0);
    const frame5 = new Frame(0, 0);
    const frame6 = new Frame(0, 0);
    const frame7 = new Frame(0, 0);
    const frame8 = new Frame(0, 0);
    const frame9 = new Frame(0, 0);
    const frame10 = new Frame(10, 0);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.add(frame4);
    scoreCard.add(frame5);
    scoreCard.add(frame6);
    scoreCard.add(frame7);
    scoreCard.add(frame8);
    scoreCard.add(frame9);
    scoreCard.add(frame10);
    const bonusRoll = new BonusRoll(10, 10);
    scoreCard.finalFrameBonus(bonusRoll);
    const expectedFrame10 = { rollOne: 10, rollTwo: 0, frameTotal: 30, isStrike: true, isSpare: false, bonusStatus: false };
    expect(scoreCard.displayScore()).toContainEqual(expectedFrame10);
  
  })

  it ('does not allow early bonuses to be added ', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(2, 3);
    const frame2 = new Frame(3, 4);
    const frame3 = new Frame(6, 2);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    const bonusRoll = new BonusRoll(7, 2);
    try {
      scoreCard.finalFrameBonus(bonusRoll);
    } catch (error) {
      expect(error.message).toBe('bonus rolls can only be added to the 10th frame');
    };
  })

  it ('correctly handles a full game', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(3, 4);
    const frame2 = new Frame(3, 3);
    const frame3 = new Frame(7, 2);
    const frame4 = new Frame(4, 5);
    const frame5 = new Frame(0, 5);
    const frame6 = new Frame(0, 9);
    const frame7 = new Frame(5, 4);
    const frame8 = new Frame(2, 4);
    const frame9 = new Frame(4, 4);
    const frame10 = new Frame(8, 0);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.add(frame4);
    scoreCard.add(frame5);
    scoreCard.add(frame6);
    scoreCard.add(frame7);
    scoreCard.add(frame8);
    scoreCard.add(frame9);
    scoreCard.add(frame10);
    expect(scoreCard.finalScore()).toBe(76);
  
  })

  it ('correctly handles a game with strikes and spares', () => {
    const scoreCard = new Scorecard();
    const frame1 = new Frame(10, 0);
    const frame2 = new Frame(7, 3);
    const frame3 = new Frame(10, 0);
    const frame4 = new Frame(10, 0);
    const frame5 = new Frame(5, 5);
    const frame6 = new Frame(3, 6);
    const frame7 = new Frame(7, 3);
    const frame8 = new Frame(2, 4);
    const frame9 = new Frame(4, 4);
    const frame10 = new Frame(10, 0);
    scoreCard.add(frame1);
    scoreCard.add(frame2);
    scoreCard.add(frame3);
    scoreCard.add(frame4);
    scoreCard.add(frame5);
    scoreCard.add(frame6);
    scoreCard.add(frame7);
    scoreCard.add(frame8);
    scoreCard.add(frame9);
    scoreCard.calculateBonuses();
    scoreCard.add(frame10);
    const bonusRoll = new BonusRoll(10, 10);
    scoreCard.finalFrameBonus(bonusRoll);
    expect(scoreCard.finalScore()).toBe(163);
  
  })
  
  
})


    
    