const Frame = require('../lib/frame');

describe ('Frame', () => {

  it ('returns a score between 1 and 10', () => {
    const frame = new Frame(1, 5);
    expect(frame.isStrike()).toEqual(false);
    expect(frame.isSpare()).toEqual(false);
    expect(frame.frameTotal()).toEqual(6);
  });

  it ('raises and error if the sum of the frame arguments exceeds 10', () => {
    const frame = new Frame(10, 5);
    try {
      frame.frameTotal();
    } catch (error) {
      expect(error.message).toBe('invalid score');
    }});

  it ('identifies a frame with a spare', () => {
    const frame = new Frame(6, 4);
    expect(frame.isStrike()).toEqual (false);
    expect(frame.isSpare()).toEqual (true);
    expect(frame.frameTotal()).toEqual (10);
    expect(frame.bonusStatus()).toEqual (true);
  });

  it ('identifies a frame with a strike', () => {
    const frame = new Frame(10, 0);
    expect(frame.isStrike()).toEqual (true);
    expect(frame.isSpare()).toEqual (false);
    expect(frame.frameTotal()).toEqual (10);
    expect(frame.bonusStatus()).toEqual (true);
  });

  it ('adds the frame information into an object',() => {
    const frame = new Frame(10, 0);
    const expectedFrame = { rollOne: 10, rollTwo: 0, frameTotal: 10, isStrike: true, isSpare: false, bonusStatus: true};
    expect(frame.frameToObject()).toEqual (expectedFrame);
  
  })
});