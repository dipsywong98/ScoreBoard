<template>
  <div>
    <select v-model="team0Id">
      <option v-for="(team,k) in teams" :value="k" :key="team.enName">({{team.groupNumber}}) {{team.enName}}</option>
    </select>
    <select v-model="team1Id">
      <option v-for="(team,k) in teams" :value="k" :key="team.enName">({{team.groupNumber}}) {{team.enName}}</option>
    </select>
    <button @click="pushNewMatch">
      Push New Match
    </button>
  </div>
</template>
<script>
import firebase from '../lib/firebase'
const db = firebase.database()
export default {
  name: 'newGame',
  mounted(){
    db.ref('teams').once('value',snapshot=>this.teams = snapshot.val())
  },
  data() {
    return {
      teams: [],
      team0Id: 0,
      team1Id: 0
    }
  },
  methods:{
    async pushNewMatch(){
      let nextId = await db.ref('nextId').once('value')
      nextId = nextId.val() || 0
      console.log(nextId)
      let currActive = await db.ref('active').once('value')
      currActive = currActive.val()
      db.ref('historical/'+nextId).set(currActive)
      db.ref('nextId').set(nextId+1)
      db.ref('active').set({
        team0:{
          ...currActive.team0,
          teamname: this.teams[this.team0Id],
          scores: 0,
          violations: 0,
        },
        team1:{
          ...currActive.team1,
          teamname: this.teams[this.team1Id],
          scores: 0,
          violations: 0
        },
        state: 0,
        dueTime: 0
      })
    }
  }
}
</script>
