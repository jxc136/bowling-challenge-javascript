const Frame = require('../lib/frame');

describe ('Frame', () => {
  it ('returns a score between 1 and 10', () => {
    const frame = new Frame(1, 5);
    expect(frame.isStrike()).toEqual (false)
    expect(frame.isSpare()).toEqual (false)
    expect(frame.frameTotal()).toEqual (6)
  });
   
});