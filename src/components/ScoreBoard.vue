<template>
    <div class="scoreboard">
        <div class="score-layer">
            <div class="item left-box">
                <team-column
                        :color="team0.color||'red'"
                        :model="team0"
                        :is-left="true"
                />
            </div>
            <div class="item right-box">
                <team-column
                        :color="team1.color||'blue'"
                        :model="team1"
                        :is-left="false"
                />
            </div>
        </div>
        <div class="logo-layer">
            <div class="logo">
                <img src="../assets/logo.svg">
            </div>
        </div>
        <div class="overlay-layer">
            <div class="tab top-tab">
                <h1 class="event-name">Preliminary</h1>
            </div>
            <div class="tab bottom-tab">
                <Timer :due-time="dueTime" :start-time="startTime" :state="active.state"/>
            </div>
        </div>
        <div class="anim-layer">
            <div class="normal-win-wrapper">
                <transition name="fade">
                    <div class="box" v-if="winningTeam">
                        <h5 class="win-team-name">{{winningTeam.teamname && winningTeam.teamname.enName}}</h5>
                        <h1 class="win-text">Wins!</h1>
                    </div>
                </transition>
            </div>
            <div class="end-game-wrapper">
                <transition name="end">
                    <div class="end-game-box" v-if="endTeam">
                        <div class="graphics-layer">
                            <img src="../assets/house_graphics.svg">
                        </div>
                        <div class="fg-layer">
                            <h5 class="win-team-name">{{endTeam.teamname && endTeam.teamname.enName}}</h5>
                            <h1 class="win-text">End Game!</h1>
                        </div>
                    </div>
                </transition>
            </div>
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
            active: Object,
            team0: Object,
            team1: Object,
            dueTime: Number,
            startTime: Number
        },
        computed: {
            topDownWinClass() {
                return ([this.team0, this.team1].filter(team => team.state === "Win"))[0] || null;
            },
            endTeam() {
                return ([this.team0, this.team1].filter(team => team.state === "End Game"))[0] || null;
            }
        }
    };
</script>

<style scoped lang="scss">
    .scoreboard {
        position: relative;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        user-select: none;
    }

    .score-layer {
        height: 100%;
        z-index: 0;
        position: relative;

        > .item {
            position:absolute;
            width: 50%;
            height: 100%;
            top:0;

            &.left-box {
                left:0;
            }

            &.right-box {
                right:0;
            }
        }
    }

    .logo-layer {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .logo {
            mix-blend-mode: multiply;

            > img {
                height: 30vh;
            }
        }
    }

    .overlay-layer {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .tab {
            position: relative;
            padding: 3vh 4vw;
            z-index: 1;
            perspective: 300px;
            filter: drop-shadow(0 0.5vh 1vh rgba(0, 0, 0, 0.3));

            &::before {
                content: " ";
                display: block;
                position: absolute;
                background-color: #fff;
                border-radius: 1rem;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                z-index: -1;
                outline: 1px solid transparent;
            }
        }

        .top-tab {
            &::before {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                transform: rotateX(-15deg);
            }
        }


        .bottom-tab {
            &::before {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                transform: rotateX(15deg);
            }
        }

        .event-name {
            font-size: 6vh;
        }
    }

    .anim-layer {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 2;

        .normal-win-wrapper {
            position: absolute;
            top:0;
            left:0;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;

            .box {
                width: 30vw;
            }

            .win-team-name {
                font-size: 6vh;
            }

            .win-text {
                font-size: 8vh;
            }
        }

        .end-game-wrapper {
            position: absolute;
            top:0;
            left:0;
            height: 100%;
            width: 100%;

            > .end-game-box {
                height: 100%;

                > * {
                    position: absolute;
                    top:0;
                    left:0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }

            .fg-layer {
                padding-bottom: 22.5vh;
            }

            .graphics-layer {
                padding-top: 27.5vh;

                > img {
                    height: 70vh
                }
            }

            .win-team-name {
                color: #fff;
                text-shadow: 0 0 2vh rgba(0,0,0,0.6);
                font-size: 8vh;
            }

            .win-text {
                color: var(--red);
                text-shadow: 0 0 2vh rgba(255,255,255,0.6);
                -webkit-text-stroke: 0.4vh #fff;
                font-size: 10vh;
            }
        }
    }

    .box {
        background-color: #fff;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 2vh 4vh rgba(0, 0, 0, 0.6);
    }

    //Transitions
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s, transform .5s ease-out;
    }

    .fade-enter-active {
        animation: bounce 1s linear both;
    }

    .fade-leave-active {
        transform: scale(0.5);
    }

    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

    .end-enter-active, .end-leave-active {
        transition: opacity .5s, transform .5s ease-out;
    }

    .end-enter-active {
        animation: grow 1.5s linear both;
    }

    .end-leave-active {
        transform: scale(0.5);
    }

    .end-enter, .end-leave-to{
        opacity: 0;
    }

    //Bounce
    @keyframes bounce {
        0% { -webkit-transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        3.4% { -webkit-transform: matrix3d(0.658, 0, 0, 0, 0, 0.703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.658, 0, 0, 0, 0, 0.703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        4.7% { -webkit-transform: matrix3d(0.725, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.725, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        6.81% { -webkit-transform: matrix3d(0.83, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.83, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        9.41% { -webkit-transform: matrix3d(0.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        10.21% { -webkit-transform: matrix3d(0.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        13.61% { -webkit-transform: matrix3d(1.062, 0, 0, 0, 0, 1.166, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.062, 0, 0, 0, 0, 1.166, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        14.11% { -webkit-transform: matrix3d(1.07, 0, 0, 0, 0, 1.165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.07, 0, 0, 0, 0, 1.165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        17.52% { -webkit-transform: matrix3d(1.104, 0, 0, 0, 0, 1.12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.104, 0, 0, 0, 0, 1.12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        18.72% { -webkit-transform: matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        21.32% { -webkit-transform: matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        24.32% { -webkit-transform: matrix3d(1.075, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.075, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        25.23% { -webkit-transform: matrix3d(1.067, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.067, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        29.03% { -webkit-transform: matrix3d(1.031, 0, 0, 0, 0, 0.948, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.031, 0, 0, 0, 0, 0.948, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        29.93% { -webkit-transform: matrix3d(1.024, 0, 0, 0, 0, 0.949, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.024, 0, 0, 0, 0, 0.949, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        35.54% { -webkit-transform: matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        36.74% { -webkit-transform: matrix3d(0.986, 0, 0, 0, 0, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.986, 0, 0, 0, 0, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        41.04% { -webkit-transform: matrix3d(0.98, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.98, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        44.44% { -webkit-transform: matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        52.15% { -webkit-transform: matrix3d(0.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        59.86% { -webkit-transform: matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        63.26% { -webkit-transform: matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        75.28% { -webkit-transform: matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        85.49% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        90.69% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    }

    @keyframes grow {
        0% { -webkit-transform: matrix3d(0.2, 0, 0, 0, 0, 0.2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.2, 0, 0, 0, 0, 0.2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        5.81% { -webkit-transform: matrix3d(0.587, 0, 0, 0, 0, 0.587, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.587, 0, 0, 0, 0, 0.587, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        11.61% { -webkit-transform: matrix3d(0.904, 0, 0, 0, 0, 0.904, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.904, 0, 0, 0, 0, 0.904, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        17.42% { -webkit-transform: matrix3d(1.072, 0, 0, 0, 0, 1.072, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.072, 0, 0, 0, 0, 1.072, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        23.12% { -webkit-transform: matrix3d(1.114, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.114, 0, 0, 0, 0, 1.114, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        30.33% { -webkit-transform: matrix3d(1.078, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.078, 0, 0, 0, 0, 1.078, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        37.44% { -webkit-transform: matrix3d(1.026, 0, 0, 0, 0, 1.026, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.026, 0, 0, 0, 0, 1.026, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        44.54% { -webkit-transform: matrix3d(0.995, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.995, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        51.65% { -webkit-transform: matrix3d(0.987, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.987, 0, 0, 0, 0, 0.987, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        80.28% { -webkit-transform: matrix3d(1.001, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.001, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    }
</style>