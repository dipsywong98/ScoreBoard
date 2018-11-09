<template>
  <div class="teamcolumn-root" :style="bgc">
    <div class="teamcolumn-item">

    <h1 class="scoreboard">
      {{teamname}}
    </h1>
    </div>
    <div class="teamcolumn-item">
    <h3 class="scoreboard">Scores</h3>
    <h1 class="scoreboard">{{scores}}</h1>
    </div>
    <div class="teamcolumn-item">
    <h4 class="scoreboard">Violations</h4>
    <h5 class="scoreboard">{{violations}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamColomn',
  props: {
    color: String,
    teamname: String,
    scores: Number,
    violations: Number
  },
  computed: {
    bgc(){
      const {color} = this
      const textColor = {
        [color]: '#000000',
        red: '#000000',
        blue: '#ffffff',
        green: '#000000'
      }[color]
      return {
        backgroundColor: this.color,
        color: textColor
      }
    }
  }
}
</script>

<style>
.teamcolumn-root{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.teamcolumn-item{
  margin:5em
}
</style>