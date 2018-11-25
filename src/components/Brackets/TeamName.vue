<template>
    <div class="team-name" :class="bgClass">
        <div v-if="team">
            {{team.enName}}
        </div>
        <div v-if="['Final', '3rd'].indexOf(match.matchType) > -1">
            <div class="medal first" v-if="match.matchType === 'Final' && win">1st</div>
            <div class="medal second" v-if="match.matchType === 'Final' && !win">2nd</div>
            <div class="medal third" v-if="match.matchType === '3rd' && win">3rd</div>
        </div>
        <img v-if="team && team.state === 'End Game'" src="../../assets/house_graphics.svg" class="end-game-icon">
        <div v-if="canAdvance" :class="[team && team.color + '-edge edge', toChampionMatch && 'champion-match']"></div>
        <div class="advancement" v-if="canAdvance" :class="[team && team.color + '-edge', isMatchTop ? 'top' : 'down', match.isTop ? 'go-down' : 'go-up', toChampionMatch && 'champion-match', longEdge && 'long-edge']"></div>
        <div class="advancement2" v-if="canAdvance" :class="[team && team.color + '-edge', isMatchTop ? 'top' : 'down', match.isTop ? 'go-down' : 'go-up', toChampionMatch && 'champion-match', longEdge && 'long-edge']"></div>
    </div>
</template>

<script>
    export default {
        name: "TeamName",
        props: {
            team: Object,
            /**
             * Expects "Win"|"Lose"|"Playing"|"Champion"|"2nd"|"3rd"|"Nothing"
             */
            winningState: String,
            match: Object,
            isMatchTop: Boolean,
        },
        computed: {
            bgClass() {
                return this.team && (["Win", "End Game", null].indexOf(this.team.state) > -1 || ["Final", "Semi Final"].indexOf(this.match.matchType) > -1) && this.team.color + "-gradient";
            },
            win() {
                return ["Win", "End Game"].indexOf(this.team.state) > -1;
            },
            canAdvance() {
                return (this.win || this.match.matchType === "Semi Final") && ["Final", "3rd"].indexOf(this.match.matchType) < 0;
            },
            toChampionMatch() {
                return this.win && this.match.matchType === "Semi Final";
            },
            longEdge() {
                return this.match.matchType === "Semi Final"
            }
        }
    }
</script>

<style scoped lang="scss">
    $line-width: 1vh;
    $match-height: 8vh;

    .team-name {
        position:relative;
        height: $match-height;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding-left: 4vw;
        color: #aaa;
        background: linear-gradient(to bottom, #e8eeef 0%,#cdd3d3 100%);
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
        width: 2.5vw;
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
        left:0;
        top:0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2vh;
        width: 3.5vw;

        &.first {
            background: linear-gradient(to bottom, #ffffaa 0%,#ffda38 100%);
            color: #EA9F27;
        }

        &.second {
            background: linear-gradient(to bottom, #fefefe 0%,#cdd3d3 100%);
            color: #989EA0;
        }

        &.third {
            background: linear-gradient(to bottom, #efd1a0 0%,#c97a2c 100%);
            color: #D34423;
        }
    }

    .end-game-icon {
        height: 100%;
        position:absolute;
        top:0;
        right:-3vh;
    }
</style>