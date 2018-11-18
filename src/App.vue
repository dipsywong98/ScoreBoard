<template>
  <div id="app">
    <div v-if="active">
    <score-board :team0="active.team0" :team1="active.team1"/>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyAkbaZU81i6c-ObknORRdh1hPoe5twKw28",
  authDomain: "scoreboard-d.firebaseapp.com",
  databaseURL: "https://scoreboard-d.firebaseio.com",
  projectId: "scoreboard-d",
  storageBucket: "scoreboard-d.appspot.com",
  messagingSenderId: "866950274400"
};
firebase.initializeApp(config)
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
    console.log('mounted')
    activeRef.once('value',snapshot=>console.log(snapshot.val()))
    activeRef.on('value',snapshot=>{
      console.log('onvalue',snapshot.val())
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
