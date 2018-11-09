<template>
  <div id="app">
    <score-board :team0="{
      teamname:'team0',
      scores:300,
      violations:0
    }" :team1="{
      teamname:'team1',
      scores:123,
      violations:4
    }"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import TeamColumn from './components/TeamColumn.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    TeamColumn,
    ScoreBoard,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
