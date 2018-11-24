const gameTime = 30 + 3 * 60
const preperationTime = 60
const forcedAutoTime = 90
const totalTime = gameTime + preperationTime

const teams = [{ 'enName': 'LG1', 'cnName': 'LG 一樓', 'groupNumber': 1 },{ 'enName': 'Back 2 Back', 'cnName': '背水二戰', 'groupNumber': 2 },{ 'enName': 'OMEGA', 'cnName': '歐賣尬', 'groupNumber': 3 },{ 'enName': 'Tetrahedron', 'cnName': '四面體', 'groupNumber': 4 },{ 'enName': 'Pentagonal Dodecahedron', 'cnName': '五角十二面體', 'groupNumber': 5 },{ 'enName': 'Mark VI', 'cnName': '符碌', 'groupNumber': 6 },{ 'enName': 'Seventy Hello Kitties', 'cnName': '你好貓x70', 'groupNumber': 7 },{ 'enName': 'Octinfinity', 'cnName': '八盡', 'groupNumber': 8 }]

const constants = {
  states: [
    'About to start',
    'Preparation',
    'Auto Game Time',
    'Manual Game Time',
    'Game End'
  ],

  gameTime,

  //state to show after # seconds the game start, -1 means independent
  stateTime: [
    -1, //about to start
    0,
    preperationTime,
    preperationTime + forcedAutoTime,
    totalTime
  ],

  totalTime,
  // gradients: {
  //   blue: `background: linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);`
  // }
  teams
}

export default constants

export {teams}
