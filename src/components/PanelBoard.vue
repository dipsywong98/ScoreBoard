<template>
  <div>
    <div v-if="active!==null">
      <div class="flex">
        <div class="item">
          <team-column-editor
            v-model="team0"
            @input="onTeamChange"
            :on-end-game="()=>onEndGame(0)"
            :on-win="()=>onWin(0)"
          />
        </div>
        <div class="item">
          <h1>Robot Design Contest Panel</h1>
          <Timer
            :due-time="active.dueTime"
            :start-time="active.startTime"
            :silent="true"
            :onDue="onDue"
          />
          <!-- <h4>End Game: {{endGameTeamname && endGameTeamname.enName || 'NONE'}}</h4> -->
          <p>
            result:
          </p>
          <p>
          <div>
            {{active.team0.teamname.groupNumber}}: {{active.team0.state}}
          </div>
          <div>
            {{active.team1.teamname.groupNumber}}: {{active.team1.state}}
          </div>
          </p>
          <button @click="startGame">Start Game</button>
          <!-- <button @click="startPreparation">Start Preparation</button> -->
          <div>
            <div class="box">
              <NewGame v-if="startingNewGame"></NewGame>
              <button
                @click="startingNewGame = !startingNewGame"
              >{{(startingNewGame?'Cancel':'New Game')}}</button>
            </div>
            <button @click="beep">beep</button>
          </div>
        </div>
        <div class="item">
          <team-column-editor
            v-model="team1"
            @input="onTeamChange"
            :on-end-game="()=>onEndGame(1)"
            :on-win="()=>onWin(1)"
          />
        </div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>
<script>
import TeamColumnEditor from "./TeamColumnEditor.vue";
import Timer from "./Timer.vue";
import constants from "../lib/constants"
const {states,totalTime,stateTime} = constants
import firebase from '../lib/firebase'
import NewGame from './NewGame.vue'
import beep from '../lib/beep'
import getEndGame from '../lib/get-endgame'

const db = firebase.database()

export default {
  name: "panelboard",
  components: {
    TeamColumnEditor,
    Timer,
    NewGame
  },
  props: {
    dueTime: Number,
    state: Number
  },
  async mounted(){
    db.ref('active').on('value',snapshot=>{
      this.active = snapshot.val()
      this.team0 = this.active.team0
      this.team1 = this.active.team1
    })
    // console.log(JSON.stringify(await db.ref('teams').once('value')))
  },
  data(){
    return {
      active: null,
      team0: null,
      team1: null,
      startingNewGame: false
    }
  },
  methods:{
    onTeamChange(){
      db.ref('active').set(this.active)
    },
    startGame(){
      db.ref('active/dueTime').set(Date.now()+totalTime*1000)
      db.ref('active/startTime').set(Date.now())
      db.ref('active/state').set(1)
      this.startingNewGame = false
    },
    beep,
    teamWinString(id){
      switch(id){
        case 0:
        return `${this.active.team0.color} wins`
        case 1:
        return `${this.active.team1.color} wins`
        default:
        return `draw`
      }
    },
    onDue(){
      // if(this.active.team0.scores > this.active.team1.scores){
      //   this.active.result = this.teamWinString(0)
      // }else if(this.active.team0.scores < this.active.team1.scores){
      //   this.active.result = this.teamWinString(1)
      // }else{
      //   this.active.result = 'draw'
      // }
      // this.updateResult()
    },
    updateResult(){
      console.log('update',this.active.result)
      db.ref('active/result').set(this.active.result)
    },
    onEndGame(id){
      console.log('on end game')
      this.onWin(id)
      switch(id){
        case 0:
        this.active.team0.state = 'End Game';break;
        case 1:
        this.active.team1.state = 'End Game';break;
      }
      db.ref('active').set(this.active)
    },
    onWin(id){
      switch(id){
        case 0:
        this.active.team0.state = 'Win';
        this.active.team1.state = 'Lose';
        break;
        case 1:
        this.active.team1.state = 'Win';
        this.active.team0.state = 'Lose';
        break;
      }
      db.ref('active').set(this.active)
      
    }
  },
  computed:{
    endGameTeamname(){
      return getEndGame(this.active)
    }
  }
};
</script>

<style>
.flex {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  width: 100%;
  height: 98vh;
}

.panelboard {
  margin: 0;
}

h1.panelboard {
  font-size: 7em;
}
h2.panelboard {
  font-size: 6em;
}
h3.panelboard {
  font-size: 5em;
}
h4.panelboard {
  font-size: 4em;
}
h5.panelboard {
  font-size: 3em;
}

.box {
  border: 1px #000 solid;
}
</style>