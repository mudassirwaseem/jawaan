import React from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Main() {
    const history = useHistory();

    const googlesubmit =(() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          var user = result.user;
          let userid = user.uid
          history.replace("/")
          let create_user = {
              name: user.displayName,
              email: user.email,
              profile: user.photoURL,
              uid: user.uid
          }
         console.log(create_user)
         firebase.database().ref(`Students/${userid}/PersonalData`).set(create_user)
          
          // ...
        }).catch((error) => {
      
            console.log(error.message)
        });
    })

    return (
        <div>
            <h1>Google Auth</h1>
            <button onClick={googlesubmit}>Google Sign In</button>

        </div>
    )
}

export default Main
