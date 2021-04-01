import React ,{useEffect} from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Login2() {
    const history = useHistory();
    const googlesubmit = (() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)

            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var user = result.user;
               
                // console.log(user)
                let userid = user.uid
                history.replace("/Foam")
                let create_user = {
                    name: user.displayName,
                    email: user.email,
                    profile: user.photoURL,
                    uid: user.uid,
                }
                console.log(create_user)
                
                firebase.database().ref(`Jawaan_Pakistan/Users/${userid}/AllData/Profile`).set(create_user)

                
            }).catch((error) => {

                console.log(error.message)
            });
    })


    return (
        <div>
            
<button onClick={googlesubmit}>Google login</button>

        </div>
    )
}

export default Login2
