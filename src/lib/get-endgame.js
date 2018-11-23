/**
 * Given an active competition object, return the teamname object of end game team
 * @param active the active object
 * @returns teamname of endgame team if one and only one endgame team exist, else null
 */
export default active => {
  if(active.team0.endGame !== active.team1.endGame){
    if(active.team0.endGame){
      return active.team0.teamname
    } else {
      return active.team1.teamname
    }
  } else {
    return null
  }
}