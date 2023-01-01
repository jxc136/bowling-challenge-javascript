
* 10 Frames

For each frame:
* Player has 2 attempts to knock down 10 pins
* Turn ends when player knocks down 10 mins or has had two attemps 

### Scoring:

#### Open Frame Scoring

"An open frame occurs if the bowler uses both of their rolls and fails to knock down all ten pins (0-9 pins were knocked down). henever this happens without a preceding spare or strike, the bowler will be awarded points equal to the number of pins they just knocked down."

#### Scoring after a spare

"When you bowl a spare, the value for that frame will be 10 plus the total pins knocked down on the next roll. For instance, after bowling a spare in the third frame, you knock down 7 pins on the first roll in the fourth frame—you will then add 17 to your running total in the third frame."

#### Scoring after a strike

When you bowl a strike, the value for that frame will be 10 plus the total pins knocked down on the next two rolls. That is why you get 30 when you bowl three strikes in a row, and also why a perfect game equals 300—a score of 30 is achieved for each of the 10 frames.

*In other words - the value for a strike is calculated for the next two rolls, regardless of the frame!* 

#### The final frame

"Scoring in the 10th frame is slightly different if you roll a spare or a strike. Since a spare is 10 plus the next roll, you get an extra roll if you score a spare in the 10th frame. If you bowl a strike with your first roll in the 10th frame, you get two more rolls so you can complete the score since a strike is 10 plus the next two rolls."

*the maximum score on the last frame is 30
*The value of the extra rolls you get in strike of spare is only added to your spare score, and not a score in of itself.


### Scenarios

### Open Frames and general scenarios

* Score must be between 0 - 10
  * Error raised otherwise

#### Spares

* Spare into open frame
  * Roll one of the next frame added to spare frame total
* Spare into strike 
  * Adds 10 to the spare frames score (frame total = 20)
* Spare into spare: 
  * Second spare doesnt matter - ONLY Roll 1 of the next frame does 
* Spare into gutter
  * 0 added to spare frame (10 total)

#### Strikes 

* Strike into open frame
  * adds total off the next two rolls to the strike frame score

* Strike into spare 
  * adds total off the next two rolls to the strike frame score 
  (strike only looks at rolls so spare doesnt matter)

* Strike into strike into open frame
  * Adds 10 + the value of the first roll of the open frame
  (strike only looks at score so strike modifier doesnt matter)
  
* Strike into strike into strike 
  * Adds each of the next two ROLLS is 10 so 20 is added to the frame, total modifiers dont apply

#### Final Frame

* Strike
  * grants TWO additional rolls, adds total of those rolls to frame 10 total (does not count as its own frame)

* Spare 
  * Grants ONE additional roll, adds total of that roll to frame 10. No extra roll if the third roll is a strike. 

### Initial Class outline

```Javascript

class Frame {

  constructor(rollOne, rollTwo) {
    // Monitor the number of pins for each roll
    // Error handling will be handled in the frameTotal method
    this.rollOne = rollOne;
    this.rollTwo = rollTwo;
  }

  frameTotal() {
    //  Returns total of the frame
    // Returns error if a single frame exceeds 10 pins 
  }

  isStrike?() {
    // returns true if the frame has a strike
  }

  isSpare() {
    // returns true if the frame is a spare
  }

  bonusStatus() {
    // Marks if the frame has outstanding bonus points to be calculated
  }

  frameToObject() {
    // Adds all of the information about the frame into an object to be accessed by the scorecard
  }

}

class ScoreCard {

  constructor{
    this.score = []
  }

  add(frame){
    // Arguement is an instance of the frame class
    // Adds the score class instance into the score array
  }

  resolveStrike(){
    // resolves strike bonuses for each frame
  }

  resolveSpare(){
    // resolves spare bonuses for each frame
  }

  calculateBonuses(){

    // executes resolveSpare and resolveStrike
  }

  displayScore(){
    // returns score after bonuses are calculated 
  }

  finalFrameBonus(bonusRoll){
    // calculates bonuses for the final frame 
    // Accepts an instance of the BonusRoll class as an arguement
  }

  finalScore(){
    // returns the final game score
  }
}

class BonusRoll{
  // Handles bonus bonus rolls if the player gets a strike or spare in frame 10
  constructor(rollOne, rollTwo) {
    // Monitor the number of pins for each roll
    this.rollOne = rollOne;
    this.rollTwo = rollTwo;
  }

   get rollOne() {
    return this.rollOne;
  }

  get rollTwo() {
    return this.rollTwo;
  }
}

```

### Test examples 

```Javascript

// Frame Unit tests:

  
  // 1 - Score must be between 0 - 10

    const frame = new Frame(1, 5);
    frame.isStrike?(); // => false
    frame.isSpare?(); // => false
    ;

  // 2 - Raises error if sum of frame arguments is > 20

    const frame = new Frame(10, 5);
    frame.frameTotal(); // error: "invalid score"
    
    

  // 3 Frame is a spare

    const frame = new Frame(6, 4);
    frame.frameTotal(); // 10
    frame.isSpare?(); // true
    frame.isStrike?(); // false
    frame.bonusStatus(); // true 

  // 4 Frame is a Strike 

    const frame = new Frame(6,4); 
    frame.frameTotal(); // 10
    frame.isSpare?(); // false
    frame.isStrike?(); // true
    frame.bonusStatus(); // true 

// Scorecard integration tests 

  // 1 - Frame class objects are correctly added to the score array 

    const scoreCard = new Scorecard();
    const frame = new Frame(5, 3);
    scorecard.add(frame);
    const testScorecard =  { roll_one: 5, roll_two: 3, frame_total: 8, is_strike?: false, is_spare?: false, bonus_status:false }
    scorecard.displayScore(); // => include testScorecard
 
  // 2 - Scorecard correctly handles scoring for a spare 

    const scoreCard = new Scorecard();
    const frame1 = new Frame(5, 3);
    frame1.bonusStatus(); // => true
    const frame2 = new Frame(5, 2)

      scorecard = ScoreCard.new
      frame1 = Frame.new(6,4) 
      frame1_total = frame1.frame_total
      frame2 = Frame.new(5,2) 
      scorecard.add(frame1_total)
      scorecard.add(frame2_total)

      expected_scorecard = {
        frame_one: 15
        frame_two: 7
      }
      expect(scorecard.total).to include(expected_scoredcard)
      expect(frame1.is_spare?).to eq true

    // 2 - Scorecard correctly calculates a spare into a strike (in isolation)

      scorecard = ScoreCard.new
      frame1 = Frame.new(5,5) 
      frame1_total = frame1.frame_total
      frame2 = Frame.new(10,0) 
      scorecard.add(frame1_total)
      scorecard.add(frame2_total)

      expected_scorecard = {
        frame_one: 20
        frame_two: 10
      }
      expect(scorecard.total).to include(expected_scoredcard)
      expect(frame1.is_spare?).to eq true

    // 3 - Scorecard correct counts spare into spare (does not care about second spare no.2)

      scorecard = ScoreCard.new
      frame1 = Frame.new(5,5) 
      frame1_total = frame1.frame_total
      frame2 = Frame.new(6,4) 
      scorecard.add(frame1_total)
      scorecard.add(frame2_total)
      expected_scorecard = {
        frame_one: 16
        frame_two: 10
      }
      expect(scorecard.total).to include(expected_scoredcard)
      expect(frame1.is_spare?).to eq true

  // 4 - Spare into a gutter frame

    scorecard = ScoreCard.new
      frame1 = Frame.new(5,5) 
      frame1_total = frame1.frame_total
      frame2 = Frame.new(0,0) 
      scorecard.add(frame1_total)
      scorecard.add(frame2_total)
      expected_scorecard = {
        frame_one: 10
        frame_two: 0
      }
      expect(scorecard.total).to include(expected_scoredcard)
      expect(frame1.is_spare?).to eq true

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame

# 1 - Strike into open frame



```
