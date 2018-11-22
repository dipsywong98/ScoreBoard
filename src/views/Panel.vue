<template>
  <div>
    blablabla
    <div v-if="!auth">
      Logging you in...
    </div>
    <div v-else>
      <panel-board />
    </div>
  </div>
</template>
<script>
import firebase from '../lib/firebase'
import PanelBoard from '../components/PanelBoard'

// const db = firebase.database()

export default {
  name: 'panel',
  components:{
    PanelBoard
  },
  mounted(){
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      this.token = result.credential.accessToken;
      // The signed-in user info.
      this.user = result.user;
      // ...
      this.auth = true
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
  data(){
    return {
      auth: false,
      token: null,
      user: null
    }
  }
}
</script>