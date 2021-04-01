import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from "../config/Firebase"

import {
    Link
} from "react-router-dom";



function Quiz() {
    const history = useHistory();

    const [data, setdata] = useState([])

    useEffect(async () => {

        let data = await firebase.database().ref(`All Quiz/Saylani/CCNA`)
        data.on("value", datasnap => {
            let quizes = datasnap.val()

            let enabled = []
            let keys = Object.keys(quizes)
            let totalQuizes = keys.length
            for (var i = 0; i < totalQuizes; i++) {
                if (quizes[keys[i]].Visible === "ON") enabled.push(keys[i])
                if (i === totalQuizes-1) setdata(enabled)
                console.log(i, quizes)
            }
        })

    }, [])

    const LogOut = () => {

        firebase.auth().signOut().then(() => {
          alert("logout")

        }).catch((error) => {
        });
    }

    return (

        <div className="App">
            <h1>Quiz</h1>
            <div style={{ marginTop: 40 }}>
               
                {data.map((val,index) => {
                    console.log(val)
                    return <Link key={index} to={{ pathname: "/Cs", name: `${val}` }}> <button > <h1>{val}</h1></button></Link>

                })}
            </div>
      <button onClick={LogOut}>LOg Out</button>
            
        </div>
    )
}




export default Quiz
