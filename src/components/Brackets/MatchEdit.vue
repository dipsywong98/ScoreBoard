<!--
/**
 * Determines the connection after the match is done
 */
isTop: Boolean,
/**
 * Competing teams
 */
teams: Array,
isMatchPlaying: Boolean,
/**
 * Expects "Quarter Final"|"Semi Final"|"Champion"|"3rd"
 */
matchType: String,
-->

<template>
    <div class="match" v-if="match.teams.length >= 2">
        <div class="match-group" :class="{'playing-glow': match && match.isMatchPlaying}">
            <div>
            <TeamPick @colorpick="value=>onColorPick(0,value)" @pick="(value)=>onPick(0,value)" v-model="match.teams[0].enName" :team="match.teams[0]" :is-match-top="true" :match="match"></TeamPick>
            <button @click="changeTeamState(0,'Win')">Win</button>
            <button @click="changeTeamState(0,'End Game')">EndGame</button>
            <button @click="changeTeamState(0,'')">No Result</button>
            </div>
            <div>
            <TeamPick @colorpick="value=>onColorPick(1,value)"  @pick="(value)=>onPick(1,value)" v-model="match.teams[1].enName" :team="match.teams[1]" :is-match-top="false" :match="match"></TeamPick>
            <button @click="changeTeamState(1,'Win')">Win</button>
            <button @click="changeTeamState(1,'End Game')">EndGame</button>
            <button @click="changeTeamState(1,'')">No Result</button>
            </div>
            <div>
            <div class="is-playing"><label :for="'in-' + _uid + 'playing'">Is Playing:</label> <input :id="'in-' + _uid + 'playing'" @change="onChange" type="checkbox" v-model="match.isMatchPlaying"></div>
            </div>
            <div class="match-name">{{match.name}}</div>
            <!-- <TeamName :team="match.teams[0]" :is-match-top="true" :match="match"/>
            <TeamName :team="match.teams[1]" :is-match-top="false" :match="match"/> -->
        </div>
    </div>
</template>

<script>
    import TeamPick from "./TeamPick"

    export default {
        name: "Match",
        components: {TeamPick},
        props: {
            match: Object,
            onEdit: Function
        },
        data(){
            return {
                
            }
        },
        computed: {
            matchState() {
                return this.match && (this.match.teams.length >= 2 ? this.winningTeam ? "Done" : this.match.isMatchPlaying ? "Playing" : "Ready" : "Nothing");
            },
            winningTeam() {
                return (this.match.teams || []).filter(team => ["Win", "End Game"].indexOf(team.state) > -1)[0] || null;
            },
            winningTeamIndex() {
                return this.winningTeam ? (this.winningTeam === this.match.teams[0] ? 0 : 1) : null;
            },
            topDownWinClass() {
                return this.winningTeam ? (this.winningTeamIndex === 0 ? "top" : "down") : null;
            },
            redBlueWinCLass() {
                return this.winningTeam && (this.winningTeam.color + "-edge");
            }
        },
        methods:{
            onChange(){
                if(this.onEdit){
                    this.onEdit(this.match)
                }
            },
            changeTeamState(id, state){
                if(state===''){
                    this.match.teams[0].state=state
                    this.match.teams[1].state=state
                }else{
                    this.match.teams[id].state = state
                    this.match.teams[1-id].state = 'Lose'
                }
                this.onChange()
            },
            onPick(id,value){
                this.match.teams[id].enName = value
                this.onChange()
            },
            onColorPick(id,value){
                this.match.teams[id].color = value
                this.onChange()
            }
        }
    }
</script>

<style lang="scss">
    $line-width: 1vh;
    $match-width: 20vw;
    $match-height: 8vh;

    .match {
        position: absolute;
        width: $match-width;
        outline: 1px solid transparent;

        .match-group {
            border: 5px solid #000;
            margin-right: -10px;

            &.playing-glow {
                border-color: #0ff;
            }
        }
    }

    button {
        position: relative;
        z-index: 3;
    }

    .team-name {
        margin-bottom: -20px;
    }

    .playing-glow {
        animation: 5s glow ease-in-out infinite;
    }

    .red-edge {
        background-color: var(--team-red);
    }

    .blue-edge {
        background-color: var(--team-blue);
    }

    .green-edge {
        background-color: var(--team-green);
    }

    .is-playing {
        [type="checkbox"] {
            transform: scale(1.5);
            margin: 10px;
        }
    }

    @keyframes glow {
        0% {
            box-shadow: 0 0 3vh rgba(58, 156, 255, 0.6);
            filter: brightness(1.2);
        }

        50% {
            box-shadow: 0 0 6vh rgba(58, 156, 255, 1);
            filter: brightness(1.8) contrast(0.7);
        }

        100% {
            box-shadow: 0 0 3vh rgba(58, 156, 255, 0.6);
            filter: brightness(1.2);
        }
    }
</style>