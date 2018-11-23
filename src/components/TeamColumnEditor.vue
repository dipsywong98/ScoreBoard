<template>
  <div :style="bgc">
    <p style="margin-top:0px">enName: <input v-model="value.teamname.enName" ref="teamenname" @change="onChange"></p>
    <p>cnName: <input v-model="value.teamname.cnName" ref="teamcnname" @change="onChange"></p>
    <p>groupNumber: <input v-model="value.teamname.groupNumber" ref="teamid" @change="onChange" type="number"></p>
    <p>Scores: <input v-model="value.scores" ref="scores" @change="onChange" type="number"></p>
    <p>Violations: <input v-model="value.violations" ref="violations" @change="onChange" type="number"></p>
    <!-- <p>EndGame: <input type="checkbox" v-model="value.endGame" ref="endGame" @change="onChange"></p> -->
    <button class="button" @click="onEndGame">EndGame</button>
    <button class="button" @click="onWin">Win</button>
    <p>Color:<select v-model="value.color" ref="color" @change="onChange">
      <option value="red">red</option>
      <option value="blue">blue</option>
      <option value="green">green</option>
      </select></p>
      <div v-for="rows in scores" :key="rows.group" style="margin-top:30px">
        <div>{{rows.group}}</div>
    <button class="button" v-for="scoreItem in rows.buttons" :key="scoreItem.name" @click="scoreItemClick(scoreItem)">{{scoreItem.name}}</button>
      </div>
  </div>
</template>

<script>
import scores from '../lib/score-points'
export default {
  name: 'TeamColomnEditor',
  props: {'value':Object,'onEndGame':Function,'onWin':Function},
  computed: {
    bgc(){
      const {color} = this.value
      const textColor = {
        [color]: '#000000',
        red: '#000000',
        blue: '#ffffff',
        green: '#ffffff'
      }[color]
      return {
        backgroundColor: this.value.color,
        color: textColor
      }
    },
    scores(){return scores}
  },
  methods:{
    onChange(){
      if(this.validate()){
        this.$emit('input',{
          ...this.value,
          // event.target.value
        })
      }
      
    },
    scoreItemClick(item){
      if(item.score){
        this.value.scores += item.score
      }
      if(item.violation){
        this.value.violations += item.violation
      }
      if(item.endGame && !this.value.endGame){
        this.value.endGame = true
      }
      this.$emit('input',{
        ...this.value
      })
    },
    validate(){
      if(typeof(this.value.scores)!==typeof(123)){
        try{
          this.value.scores = Number(this.value.scores)
        }catch(e){
          return false
        }
      }
      if(typeof(this.value.violations)!==typeof(123)){
        try{
          this.value.violations = Number(this.value.violations)
        }catch(e){
          return false
        }
      }
      console.log('hi')
      return true
    }
  }
}
</script>

<style>
.team-column{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.team-column-item{
  margin:5em
}
.button{
  margin:8px 20px
}
</style>