<template>
    <div class="tree">
        <div>
            <MatchEdit :match="brackets.match1" :onEdit="(data)=>onEdit(1,data)" style="top:0; left:4vw;"/>
            <MatchEdit :match="brackets.match2" :onEdit="(data)=>onEdit(2,data)" style="top:24vh; left:4vw;"/>
            <MatchEdit :match="brackets.match3" :onEdit="(data)=>onEdit(3,data)" style="top:49vh; left:4vw;"/>
            <MatchEdit :match="brackets.match4" :onEdit="(data)=>onEdit(4,data)" style="top:74vh; left:4vw;"/>
            <MatchEdit :match="brackets.match5" :onEdit="(data)=>onEdit(5,data)" style="top:12vh; left:28vw"/>
            <MatchEdit :match="brackets.match6" :onEdit="(data)=>onEdit(6,data)" style="top:61vh; left:28vw"/>
            <MatchEdit :match="brackets.match7" :onEdit="(data)=>onEdit(7,data)" style="top:36vh; left:52vw"/>
            <MatchEdit :match="brackets.match8" :onEdit="(data)=>onEdit(8,data)" style="top:36vh; left:78vw"/>
        </div>
    </div>
</template>

<script>
    import MatchEdit from "../components/Brackets/MatchEdit";
    import firebase from "../lib/firebase"
    import defaultBracket from '../lib/default-bracket'

    const db = firebase.database()

    export default {
        name: "Tree",
        components: {MatchEdit},
        mounted(){
            db.ref('brackets').on('value',snapshot=>{
                this.brackets = snapshot.val()
            })
        },
        data() {
            return {
                brackets: defaultBracket
            }
        },
        methods:{
            onEdit(id,data){
                db.ref(`brackets/match${id}`).set(data)
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
</style>