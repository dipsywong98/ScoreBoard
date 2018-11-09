<template>
  <div class="flex">
    <div class="item">
      <team-column
        color="red"
        :teamname="team0.teamname"
        :scores="team0.scores"
        :violations="team0.violations"
      />
    </div>
    
    <div class="item">
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>Robot Design Contest</h1>
      <Timer />
    </div>

    <div class="item">
      <team-column
        color="blue"
        :teamname="team1.teamname"
        :scores="team1.scores"
        :violations="team1.violations"
      />
    </div>
  </div>
</template>
<script>
import TeamColumn from "./TeamColumn.vue";
import Timer from "./Timer.vue";
export default {
  name: "ScoreBoard",
  components: {
    TeamColumn,
    Timer
  },
  props: {
    team0: Object,
    team1: Object,
    startTime: Number
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

.scoreboard{
  margin:0
}

h1.scoreboard{
  font-size:7em
}
h2.scoreboard{
  font-size:6em
}
h3.scoreboard{
  font-size:5em
}
h4.scoreboard{
  font-size:4em
}
h5.scoreboard{
  font-size:3em
}

</style>