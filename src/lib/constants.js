const gameTime = 30+3*60
const preperationTime = 60
const forcedAutoTime = 90
const totalTime = gameTime + preperationTime

const constants = {
  states: [
    'About to start',
    'Preperation',
    'Game Playing (Auto)',
    'Game Playing (Manual Allowed)',
    'Game End'
  ],

  gameTime,

  //state to show after # seconds the game start, -1 means independent
  stateTime:[
    -1, //about to start
    0,
    preperationTime,
    preperationTime+forcedAutoTime,
    totalTime
  ],

  totalTime
  // gradients: {
  //   blue: `background: linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);`
  // }
}

export default constants

