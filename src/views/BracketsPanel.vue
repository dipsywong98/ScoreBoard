<template>
    <div class="tree">
        <div v-if="brackets!==null">
            <MatchEdit :match="brackets.match1" :onEdit="(data)=>onEdit(1,data)" style="top:2vh; left:4vw;"/>
            <MatchEdit :match="brackets.match2" :onEdit="(data)=>onEdit(2,data)" style="top:26vh; left:4vw;"/>
            <MatchEdit :match="brackets.match3" :onEdit="(data)=>onEdit(3,data)" style="top:51vh; left:4vw;"/>
            <MatchEdit :match="brackets.match4" :onEdit="(data)=>onEdit(4,data)" style="top:76vh; left:4vw;"/>
            <MatchEdit :match="brackets.match5" :onEdit="(data)=>onEdit(5,data)" style="top:14vh; left:28vw"/>
            <MatchEdit :match="brackets.match6" :onEdit="(data)=>onEdit(6,data)" style="top:63vh; left:28vw"/>
            <MatchEdit :match="brackets.match7" :onEdit="(data)=>onEdit(7,data)" style="top:38vh; left:52vw"/>
            <MatchEdit :match="brackets.match8" :onEdit="(data)=>onEdit(8,data)" style="top:38vh; left:78vw"/>
            <button @click="clear" style="position:absolute;right:0;top:0;width:100px;height:30px">Clear All</button>
        </div>
        <div v-else>LOADING</div>
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
            var provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            this.token = result.credential.accessToken;
            // The signed-in user info.
            this.user = result.user;
            // ...
            this.auth = true
                db.ref('brackets').on('value',snapshot=>{
                    this.brackets = snapshot.val()
                    
                    this.$forceUpdate()
                })
            }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
            window.alert(`error occurs when signing in \ncode:${error.code}\nmessage:${error.message}`)
            });
        },
        data() {
            return {
                brackets: null
            }
        },
        methods:{
            onEdit(id,data){
                db.ref(`brackets/match${id}`).set(data)
            },
            clear(){
                let r = prompt('are you sure (Y/N)')
                if(r==='Y')db.ref(`brackets`).set(defaultBracket)
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