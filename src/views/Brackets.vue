<template>
    <div class="tree">
        <div>
            <Match :match="match1" style="top:0; left:4vw;"/>
            <Match :match="match2" style="top:24vh; left:4vw;"/>
            <Match :match="match3" style="top:49vh; left:4vw;"/>
            <Match :match="match4" style="top:74vh; left:4vw;"/>
            <Match :match="match5" style="top:12vh; left:28vw"/>
            <Match :match="match6" style="top:61vh; left:28vw"/>
            <Match :match="match7" style="top:36vh; left:52vw"/>
            <Match :match="match8" style="top:36vh; left:78vw"/>
        </div>
    </div>
</template>

<script>
    import Match from "../components/Brackets/Match";

    export default {
        name: "Tree",
        components: {Match},
        data() {
            return {
                match1: {
                    isTop: true,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "Lose"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "End Game"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Quarter Final"
                },
                match2: {
                    isTop: false,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "Lose"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Win"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Quarter Final"
                },
                match3: {
                    isTop: true,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "Win"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Quarter Final"
                },
                match4: {
                    isTop: false,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "Win"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Quarter Final"
                },
                match5: {
                    isTop: true,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "End Game"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Semi Final"
                },
                match6: {
                    isTop: false,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "End Game"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Semi Final"
                },
                match7: {
                    isTop: false,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "End Game"
                        },
                        {
                            enName: "LG1",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "3rd"
                },
                match8: {
                    isTop: false,
                    teams: [
                        {
                            enName: "LG1",
                            color: "red",
                            state: "End Game"
                        },
                        {
                            enName: "Seventy Hello Kitties",
                            color: "blue",
                            state: "Lose"
                        }
                    ],
                    isMatchPlaying: false,
                    matchType: "Final"
                }
            }
        }
    }
</script>

<style lang="scss">
    #app {
        perspective-origin: center;
        perspective: 120vh;
        overflow: hidden;
    }
    .tree {
        transform: rotateX(20deg) scale(0.95);
    }
</style>