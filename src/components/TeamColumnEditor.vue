<template>
  <div class="teamcolumn-root" :style="bgc">
    <p>TeamName: <input v-model="value.teamname" ref="teamname" @change="onChange"></p>
    <p>Scores: <input v-model="value.scores" ref="scores" @change="onChange"></p>
    <p>Violations: <input v-model="value.violations" ref="violations" @change="onChange"></p>
    <p>Color:<select v-model="value.color" ref="color" @change="onChange">
      <option value="red">red</option>
      <option value="blue">blue</option>
      <option value="green">green</option>
      </select></p>
    <!-- <div class="teamcolumn-item">

    <h1 class="scoreboard">
      {{value.teamname}}
    </h1>
    </div>
    <div class="teamcolumn-item">
    <h3 class="scoreboard">Scores</h3>
    <h1 class="scoreboard">{{value.scores}}</h1>
    </div>
    <div class="teamcolumn-item">
    <h4 class="scoreboard">Violations</h4>
    <h5 class="scoreboard">{{value.violations}}</h5>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TeamColomn',
  props: ['value'],
  computed: {
    bgc(){
      const {color} = this.value
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
  },
  methods:{
    onChange(event){
      console.log(this.value)
      this.$emit('input',{
        ...this.value,
        // event.target.value
      })
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