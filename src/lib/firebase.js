import firebase from 'firebase'
let config = {
  apiKey: "AIzaSyAkbaZU81i6c-ObknORRdh1hPoe5twKw28",
  authDomain: "scoreboard-d.firebaseapp.com",
  databaseURL: "https://scoreboard-d.firebaseio.com",
  projectId: "scoreboard-d",
  storageBucket: "scoreboard-d.appspot.com",
  messagingSenderId: "866950274400"
};
firebase.initializeApp(config)
export default firebase
