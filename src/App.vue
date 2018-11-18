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
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'app',
  components: {
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
