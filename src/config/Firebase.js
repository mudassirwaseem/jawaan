import  firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBfKxFTEdW9-uwGgtJOGOhNmLlvFoKmXhI",
  authDomain: "jawan-pakistan-7b9a9.firebaseapp.com",
  databaseURL: "https://jawan-pakistan-7b9a9-default-rtdb.firebaseio.com",
  projectId: "jawan-pakistan-7b9a9",
  storageBucket: "jawan-pakistan-7b9a9.appspot.com",
  messagingSenderId: "192766373698",
  appId: "1:192766373698:web:4f2812960c113ed64222db",
  measurementId: "G-92ZTQL0Z73"
};
  
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
export default firebase ;