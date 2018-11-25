<template>
    <div class="tree">
        <div>
            <Match :match="brackets.match1" style="top:0; left:4vw;"/>
            <Match :match="brackets.match2" style="top:24vh; left:4vw;"/>
            <Match :match="brackets.match3" style="top:49vh; left:4vw;"/>
            <Match :match="brackets.match4" style="top:74vh; left:4vw;"/>
            <Match :match="brackets.match5" style="top:12vh; left:28vw"/>
            <Match :match="brackets.match6" style="top:61vh; left:28vw"/>
            <Match :match="brackets.match7" style="top:36vh; left:52vw"/>
            <Match :match="brackets.match8" style="top:36vh; left:78vw"/>
        </div>
    </div>
</template>

<script>
    import Match from "../components/Brackets/Match";
    import firebase from "../lib/firebase"
    import defaultBracket from '../lib/default-bracket'

    const db = firebase.database()

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
    }
    .tree {
        transform: rotateX(20deg) scale(0.95);
    }
</style>