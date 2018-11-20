<template>
<div>
  <div v-if="active!==null">
    <div class="flex">
      <div class="item">
        <team-column-editor
          v-model="team0"
          @input="onTeamChange"
        />
      </div>
      
      <div class="item">
        <h1>Robot Design Contest Panel</h1>
        <Timer :due-time="active.dueTime"/>
        <h1>{{stateText}}</h1>
      <div>

        <div class="box">
      <NewGame v-if="startingNewGame"></NewGame>
      <button @click="startingNewGame = !startingNewGame">{{(startingNewGame?'Cancel':'New Game')}}</button>
        </div>

      </div>
      </div>

      <div class="item">
        <team-column-editor
          v-model="team1"
          @input="onTeamChange"
        />
      </div>
    </div>
  </div>
  <div v-else>
    Loading
  </div>
</div>
</template>
<script>
import TeamColumnEditor from "./TeamColumnEditor.vue";
import Timer from "./Timer.vue";
import constants from "../lib/constants"
const {states} = constants
import firebase from '../lib/firebase'
import NewGame from './NewGame.vue'

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
  mounted(){
    db.ref('active').on('value',snapshot=>{
      this.active = snapshot.val()
      this.team0 = this.active.team0
      this.team1 = this.active.team1
    })
  },
  data(){
    return {
      active: null,
      team0: null,
      team1: null,
      startingNewGame: false
    }
  },
  computed: {
    stateText(){
      return states[this.active.state]
    }
  },
  methods:{
    onTeamChange(){
      db.ref('active').set(this.active)
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

.item{
  width:100%;
  height: 98vh;
}

.panelboard{
  margin:0
}

h1.panelboard{
  font-size:7em
}
h2.panelboard{
  font-size:6em
}
h3.panelboard{
  font-size:5em
}
h4.panelboard{
  font-size:4em
}
h5.panelboard{
  font-size:3em
}

.box{
  border: 1px #000 solid
}

</style>