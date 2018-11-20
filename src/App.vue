<template>
  <div id="app">
    <div v-if="active">
    <score-board :team0="active.team0" :team1="active.team1" :dueTime="active.dueTime" :state="active.state" :startTime="active.startTime"/>
    </div>
    <div v-else>Loading</div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
import firebase from './lib/firebase'

const db = firebase.database()
const activeRef = db.ref('active')

// activeRef.set({
//   team0:{
//     teamname:'team0',
//     scores:300,
//     violations:0
//   },
//   team1:{
//     teamname:'team1',
//     scores:123,
//     violations:4
//   }
// })

export default {
  name: 'app',
  components: {
    ScoreBoard,
  },
  mounted(){
    activeRef.on('value',snapshot=>{
      this.active = snapshot.val()
    })
  },
  data(){
    return {
      active: null
    }
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
