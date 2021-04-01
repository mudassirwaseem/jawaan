import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

import {
    Link
} from "react-router-dom";

function Quiz2() {

    const [Insitute, setInsitute] = useState("")
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true)
    const [Course, setCourse] = useState("");



    useEffect(async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                console.log(uid)
                var user = user.displayName

                
   
                firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                    .on("value", datasnap => {
                        let insitute =  (datasnap.val())
                        setInsitute(datasnap.val())
                        console.log(datasnap.val())
                        console.log(insitute)


                        firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/course`)
                        .on("value", datasnap => {
                            // console.log(datasnap.val())
                            setCourse(datasnap.val())
                            let course = (datasnap.val())
                            console.log(datasnap.val())
      


                        firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}`)
                            .on("value", datasnap => {
                                let quizes = datasnap.val()

                                let enabled = []
                                let keys = Object.keys(quizes)
                                let totalQuizes = keys.length
                                for (var i = 0; i < totalQuizes; i++) {
                                    if (quizes[keys[i]].Visible === "ON") enabled.push(keys[i])
                                    if (i === totalQuizes - 1) setdata(enabled)
                                    console.log(i, quizes)
                                }
                            })
                    })

                    })

            } else {
                console.log("error")
            }

        });


    }, [])

    // const LogOut = () => {

    //     firebase.auth().signOut().then(() => {
    //         history.replace('/Main')

    //     }).catch((error) => {
    //     });
    // }


    
    return (

        <div className="App">
            <h1>{Insitute} Quiz</h1>
            <div style={{ marginTop: 40 }}>

                {data.map((val, index) => {
                    console.log(val)
                    return <Link key={index} to={{ pathname: "/Cs2", name: `${val}` }}> <button > <h1>{val}</h1></button></Link>

                })}
            </div>


        </div>
    )
}




export default Quiz2
