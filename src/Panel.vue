<template>
  <p>Panel</p>
</template>
<script>
import firebase from './lib/firebase'

// const db = firebase.database()

export default {
  name: 'panel',
  mounted(){
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
    // ...
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
  }
}
</script>