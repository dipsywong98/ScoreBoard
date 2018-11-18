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
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>Robot Design Contest</h1>
        <Timer :due-time="dueTime"/>
        <h1>{{stateText}}</h1>
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
import {states} from "../lib/constants"
import firebase from '../lib/firebase'

const db = firebase.database()

export default {
  name: "panelboard",
  components: {
    TeamColumnEditor,
    Timer
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
      team1: null
    }
  },
  computed: {
    stateText(){
      return states[this.state]
    }
  },
  methods:{
    onTeamChange(id){
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

</style>