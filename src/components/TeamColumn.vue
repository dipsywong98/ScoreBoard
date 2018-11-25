<template>
    <div class="team-column" :class="[isLeft?'left':'right', winClass]">
        <div class="gradient-layer" :class="bgc"></div>
        <div class="name-layer">
            <h1 class="name">
                {{model.teamname.enName}}
            </h1>
            <div class="group-number">{{model.teamname.groupNumber}}</div>
        </div>
        <div class="scores-layer">
            <h1 class="scores">{{model.scores}}</h1>
        </div>
        <div class="violation-layer">
            <h5 class="violation-desc">Violations</h5>
            <h4 class="violation-count">{{model.violations}}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TeamColumn',
        props: {
            color: String,
            model: Object,
            isLeft: Boolean
        },
        computed: {
            bgc() {
                return this.color + "-gradient";
            },
            winClass() {
                return ["Win", "End Game"].indexOf(this.model.state) > -1  ? "win" : "";
            }
        }
    }
</script>

<style scoped lang="scss">
    $br: 1rem;

    .team-column {
        position: relative;
        height: 100%;
        color: #fff;
        padding-top: 3vh;
    }

    .gradient-layer {
        position:absolute;
        width: 100%;
        height: 100%;
        top:0;
        transition: 1s transform ease;
        z-index:0;
    }

    .name-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index:2;

        .name {
            position: absolute;
            top: 6.5vh;
            font-size: 6vh;
            text-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.4);
            width: 30vw;
        }

        .group-number {
            color: var(--gray);
            background-color: #fff;
            padding: 2vh;
            font-size: 5vh;
            position: absolute;
            width: 5vw;
            top: 5vh;
            box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.3);
        }
    }

    .scores-layer {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index:2;

        .scores {
            position: relative;
            font-size: 30vh;
            text-shadow: 0 1vh 1vh rgba(0, 0, 0, 0.4);
        }
    }

    .violation-layer {
        position: absolute;
        width: 100%;
        bottom: 0;
        font-size: 5vh;
        text-shadow: 0 0.4vh 0.4vh rgba(0, 0, 0, 0.4);
        z-index:2;

        .violation-desc {
            margin-bottom: 2vh;
        }

        .violation-count {
            margin-bottom: 5vh;
        }
    }

    .left {
        .name {
            text-align: left;
            left: 7vw;
        }

        .group-number {
            left:0;
            border-radius: 0 $br $br 0;
        }

        .gradient-layer {
            left:0;
            transform-origin: left;
        }
    }

    .right {
        .name {
            text-align: right;
            right: 7vw;
        }

        .group-number {
            right:0;
            border-radius: $br 0 0 $br;
        }

        .gradient-layer {
            right:0;
            transform-origin: right;
        }
    }

    .win .gradient-layer {
        z-index:1;
        transform: scale(2);
    }

    .red-gradient {
        background: linear-gradient(to bottom, #d64f4f 0%, #94304b 100%);
    }

    .blue-gradient {
        background: linear-gradient(to bottom, #516cd6 0%, #4c3094 100%);
    }

    .green-gradient {
        background: linear-gradient(to bottom, #50d354 0%, #309385 100%);
    }
</style>