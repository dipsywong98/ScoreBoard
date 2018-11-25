<template>
  <div class="team-name" :class="bgClass">
    <div v-if="team">
      <!-- {{team.enName}} -->
      <img
              v-if="team && team.state === 'End Game'"
              src="../../assets/house_graphics.svg"
              class="end-game-icon"
      >
      <div
              v-if="team && team.state === 'Win'"
              class="end-game-icon"
      >Win</div>
      <select :value="team.enName" @change="onChange" ref="picker" style="width: 150px" v-if="teams">
        <option value="">Not determined</option>
        <option v-for="t in teams" :key="t.enName" :value="t.enName">{{t.groupNumber}} {{t.enName}}</option>
      </select>
      <select :value="team.color" @change="onChange" ref="picker2" style="width: 50px">
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="green">green</option>
      </select>
    </div>
    <div v-if="['Final', '3rd'].indexOf(match.matchType) > -1">
      <div class="medal first" v-if="match.matchType === 'Final' && win && team && team.state">1st</div>
      <div class="medal second" v-if="match.matchType === 'Final' && !win && team && team.state">2nd</div>
      <div class="medal third" v-if="match.matchType === '3rd' && win && team && team.state">3rd</div>
    </div>
    <div
      v-if="canAdvance"
      :class="[team && team.color + '-edge edge', toChampionMatch && 'champion-match']"
    ></div>
    <div
      class="advancement"
      v-if="canAdvance"
      :class="[team && team.color + '-edge', isMatchTop ? 'top' : 'down', match.isTop ? 'go-down' : 'go-up', toChampionMatch && 'champion-match', longEdge && 'long-edge']"
    ></div>
    <div
      class="advancement2"
      v-if="canAdvance"
      :class="[team && team.color + '-edge', isMatchTop ? 'top' : 'down', match.isTop ? 'go-down' : 'go-up', toChampionMatch && 'champion-match', longEdge && 'long-edge']"
    ></div>
  </div>
</template>

<script>
import firebase from '../../lib/firebase'
const db = firebase.database()
export default {
  name: "TeamNameEdit",
  mounted(){
    db.ref('teams').on('value',snapshot=>{
      this.teams = snapshot.val()
      this.$forceUpdate()
    })
  },
  props: {
    value: String,
      team: Object,
      match: Object,
      isMatchTop: Boolean,
  },
        
  data(){
    return {
      teams: null
    }
  },
  computed: {
      bgClass() {
          return this.team && (["Win", "End Game", ""].indexOf(this.team.state) > -1 || ["Final", "Semi Final"].indexOf(this.match.matchType) > -1) && this.team.enName !== "" && this.team.color + "-gradient";
      },
      win() {
          return ["Win", "End Game"].indexOf(this.team.state) > -1;
      },
      canAdvance() {
          return (this.win || this.match.matchType === "Semi Final" && this.team.state === "Lose") && ["Final", "3rd"].indexOf(this.match.matchType) < 0 && this.team.enName !== "";
      },
      toChampionMatch() {
          return this.win && this.match.matchType === "Semi Final";
      },
      longEdge() {
          return this.match.matchType === "Semi Final"
      }
  },
  methods:{
          
    onChange(){
      this.$emit('pick',this.$refs.picker.value)
      this.$emit('colorpick',this.$refs.picker2.value)
      console.log(this.$refs.picker.value)
    }
  }
}
</script>

<style scoped lang="scss">
$line-width: 1vh;
$match-height: 8vh;

.team-name {
  position: relative;
  height: $match-height;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding-left: 3vw;
  color: #aaa;
  background: linear-gradient(to bottom, #e8eeef 0%, #cdd3d3 100%);
  font-size: 3vh;
}
.red-gradient {
  background: linear-gradient(to bottom, #d64f4f 0%, #94304b 100%);
  color: #fff;
}

.blue-gradient {
  background: linear-gradient(to bottom, #516cd6 0%, #4c3094 100%);
  color: #fff;
}

.green-gradient {
  background: linear-gradient(to bottom, #50d354 0%, #309385 100%);
  color: #fff;
}

.advancement {
  width: $line-width;
  position: absolute;
  left: calc(100% + 2vw - #{$line-width});
  border-radius: 1vh;
  outline: 1px solid transparent;

  &.champion-match {
    left: calc(200% + 8vw - #{$line-width});
  }

  $short-height: $match-height / 2 + $line-width / 2 + 1vh;
  $long-height: $match-height + ($match-height + $line-width) / 2 + 1vh;

  &.top {
    &.go-up {
      height: $short-height;
      top: -1vh;

      &.long-edge {
        height: $short-height + $match-height * 1.5;
        top: -1vh - $match-height * 1.5;
      }
    }

    &.go-down {
      height: $long-height;
      top: ($match-height - $line-width) / 2;

      &.long-edge {
        height: $long-height + $match-height * 1.5;
      }
    }
  }

  &.down {
    &.go-up {
      height: $long-height;
      top: -$match-height - 1vh;

      &.long-edge {
        height: $long-height + $match-height * 1.5;
        top: -$match-height * 2.5 - 1vh
      }
    }

    &.go-down {
      height: $short-height;
      top: ($match-height - $line-width) / 2;

      &.long-edge {
        height: $short-height + $match-height * 1.5;
      }
    }
  }
}

.advancement2 {
  height: $line-width;
  width: calc(2vw + #{$line-width});
  position: absolute;
  left: calc(100% + 2vw - #{$line-width});
  border-radius: 1vh 0 0 1vh;
  outline: 1px solid transparent;

  &.champion-match {
    left: calc(200% + 8vw - #{$line-width});
  }

  &.top {
    &.go-up {
      top:-1vh;

      &.long-edge {
        top:-1vh - $match-height * 1.5;
      }
    }

    &.go-down {
      bottom: -$match-height - 1vh;

      &.long-edge {
        bottom: -$match-height * 2.5 - 1vh;
      }
    }
  }

  &.down {
    &.go-up {
      top: -$match-height - 1vh;

      &.long-edge {
        top: -$match-height * 2.5 - 1vh;
      }
    }

    &.go-down {
      bottom:-1vh;

      &.long-edge {
        bottom:-1vh - $match-height * 1.5;
      }
    }
  }
}

.edge {
  position: absolute;
  left:100%;
  top: 4vh - $line-width / 2;
  width: 2vw;
  height: $line-width;
  border-radius: 0 1vh 1vh 0;

  &.champion-match {
    width: calc(100% + 8vw);
    z-index:2;
  }
}

.medal {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
  width: 3vw;

  &.first {
    background: linear-gradient(to bottom, #ffffaa 0%, #ffda38 100%);
    color: #ea9f27;
  }

  &.second {
    background: linear-gradient(to bottom, #fefefe 0%, #cdd3d3 100%);
    color: #989ea0;
  }

  &.third {
    background: linear-gradient(to bottom, #efd1a0 0%, #c97a2c 100%);
    color: #d34423;
  }
}

.end-game-icon {
  height: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 2vh;
  line-height: 4vh;
}
</style>
