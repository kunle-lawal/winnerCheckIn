import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyDsEhHQKl-d5_S4ugL-5A_OkEXsFmIVXC8",
  authDomain: "learningplatform-cedd8.firebaseapp.com",
  databaseURL: "https://learningplatform-cedd8.firebaseio.com",
  projectId: "learningplatform-cedd8",
  storageBucket: "learningplatform-cedd8.appspot.com",
  messagingSenderId: "873448863784",
  appId: "1:873448863784:web:ace39ede24c9477dd89d1d",
  measurementId: "G-QR3ZJL8G8Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase;