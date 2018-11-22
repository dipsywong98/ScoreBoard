<template>
    <div class="scoreboard">
        <div class="score-layer">
            <div class="item left-box">
                <team-column
                        :color="team0.color||'red'"
                        :teamname="team0.teamname"
                        :scores="team0.scores"
                        :violations="team0.violations"
                        :is-left="true"
                />
            </div>
            <div class="item right-box">
                <team-column
                        :color="team1.color||'blue'"
                        :teamname="team1.teamname"
                        :scores="team1.scores"
                        :violations="team1.violations"
                        :is-left="false"
                />
            </div>
        </div>
        <div class="overlay-layer">
            <div class="tab top-tab">
                <h1 class="event-name">Preliminary</h1>
            </div>
            <div class="logo">
                <img src="../assets/logo.svg">
            </div>
            <div class="tab bottom-tab">
                <Timer :due-time="dueTime" :start-time="startTime"/>
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
            team0: Object,
            team1: Object,
            dueTime: Number,
            startTime: Number
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

        .logo {
            mix-blend-mode: multiply;

            > img {
                height: 30vh;
            }
        }
    }
</style>