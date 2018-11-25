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
            <TeamName :team="match.teams[0]" :is-match-top="true" :match="match"/>
            <TeamName :team="match.teams[1]" :is-match-top="false" :match="match"/>
        </div>
    </div>
</template>

<script>
    import TeamName from "./TeamName";

    export default {
        name: "Match",
        components: {TeamName},
        props: {
            match: Object,
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