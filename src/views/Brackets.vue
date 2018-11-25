<template>
    <div class="tree">
        <div class="logo-layer">
            <div class="logo">
                <img src="../assets/logo.svg">
            </div>
        </div>
        <div class="matches">
            <match :match="brackets.match1" style="top:0; left:4vw;"/>
            <match :match="brackets.match2" style="top:24vh; left:4vw;"/>
            <match :match="brackets.match3" style="top:49vh; left:4vw;"/>
            <match :match="brackets.match4" style="top:74vh; left:4vw;"/>
            <match :match="brackets.match5" style="top:12vh; left:28vw"/>
            <match :match="brackets.match6" style="top:61vh; left:28vw"/>
            <match :match="brackets.match7" style="top:36vh; left:52vw"/>
            <match :match="brackets.match8" style="top:36vh; left:78vw"/>
        </div>
    </div>
</template>

<script>
    import Match from "../components/Brackets/Match";
    import firebase from "../lib/firebase"
    import defaultBracket from '../lib/default-bracket'

    const db = firebase.database();

    export default {
        name: "Tree",
        components: {Match},
        mounted(){
            db.ref('brackets').on('value',snapshot=>{
                this.brackets = snapshot.val()
            })
        },
        data() {
            return {
                brackets: defaultBracket
            }
        }
    }
</script>

<style lang="scss">
    #app {
        perspective-origin: center;
        perspective: 120vh;
        overflow: hidden;
        background: linear-gradient(to bottom, #ffffff 0%,#eaeeef 60%,#e0e0e0 70%,#e5c1be 100%);
    }
    .tree {
        transform: rotateX(20deg) scale(0.95);
    }
    .matches {
        filter: drop-shadow(0 0.6vh 0.4vh rgba(0, 20, 60, 0.4));
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
</style>