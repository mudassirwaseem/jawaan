import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

function Maincontainer() {
const [attendence, setattendence] = useState([])

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                console.log(uid)


                let data = firebase.database().ref(`Users/attendence`)
                data.on("value", datasnap => {
                    console.log(datasnap.val())
                    setattendence(datasnap.val())
                })
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])



    return (


        <div>
{/* {attendence.map((std)=>{
    return(
        <h1>{std}</h1>
    )
}) } */}


        </div>
    )
}

export default Maincontainer
