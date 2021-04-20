import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

import {
    Link
} from "react-router-dom";

function Quiz2() {

    const [Insitute, setInsitute] = useState("")
    const [double, setDouble] = useState(false);

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const [Course, setCourse] = useState("");
    const [Name, setname] = useState("");
    const [image, setimage] = useState("");
    const [PreviousQuiz, setPreviousQuiz] = useState([]);

    useEffect(async () => {
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                var uid = user.uid;
                console.log(uid)
                var user = user.displayName
                setimage(user.photoURL)
                setname(user)

                firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                    .on("value", datasnap => {
                        let insitute = (datasnap.val())
                        setInsitute(datasnap.val())
                        console.log(datasnap.val())
                        console.log(insitute)

                        firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Course`)
                            .on("value", datasnap => {
                                // console.log(datasnap.val())
                                setCourse(datasnap.val())
                                let course = (datasnap.val())
                                console.log(datasnap.val())

               
                                        firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}`)
                                            .on("value", datasnap => {
                                                let quizes = datasnap.val()
                                                if (quizes.length === -1) {
                                                    setLoading(true)
                                                }

                                              
                                                let enabled = []
                                                let keys = Object.keys(quizes)
                                                let totalQuizes = keys.length
                                                for (var i = 0; i < totalQuizes; i++) {
                                                    if (quizes[keys[i]].Visible === "ON") enabled.push(keys[i])
                                                    if (i === totalQuizes - 1) setdata(enabled)
                                                    setLoading(false)
                                                    console.log(i, quizes)
                                                }  
                                            })
                                    })
                            })
                    // })

            } else {
                console.log("error")
            }
        });
    }, [])



    return (

        <div className="App">
            <h4 style={{ textAlign: "start", textTransform: "capitalize", color: "red", fontWeight: "bold", textDecoration: "underline", textAlign: "center" }}>{Name}</h4>

            <h1>{Insitute} Quizss</h1>
            <div style={{ marginTop: 40 }}>

 
                {loading ? <div> No quiz Available</div> : data.map((val, index) => {
                    return <Link key={index} to={{ pathname: "/Cs2", name: `${val}` }}> <button   disabled={double} onClick={() => {setDouble(true);}} > <h1>{val}</h1></button></Link>

                })}


<div style={{position:"absolute",top:20,right:20}}>

             <Link to="/MyQuizes">  <button > My Quizes </button></Link>
</div>
                
              
            </div>


        </div>
    )
}




export default Quiz2
