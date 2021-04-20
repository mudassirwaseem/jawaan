import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

function MyQuizes() {
    const [PreviousQuiz, setPreviousQuiz] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                console.log(uid)
                var user = user.displayName


                firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                    .on("value", datasnap => {
                        let insitute = (datasnap.val())
                        console.log(datasnap.val())
                        console.log(insitute)

                        firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Course`)
                            .on("value", datasnap => {
                                // console.log(datasnap.val())
                                let course = (datasnap.val())
                                console.log(datasnap.val())

                                firebase.database().ref(`Jawaan_Pakistan/AllUserResults/${uid}/${insitute}/${course}`)
                                    .on("value", datasnap => {
                                        // console.log(datasnap.val())
                                        setPreviousQuiz(Object.values(datasnap.val()))
                                       console.log(Object.keys(datasnap.val()))
                                        setLoading(false)
                                        console.log(datasnap.val())



                                    })
                            })
                    })
                // })

            } else {
                console.log("error")
            }
        });
    }, [])



if(loading){
    return <div className="App"> <h1>No previous Data Available</h1> </div>
}

    return (
        <div className="App">
            <h1>Previous Quizes</h1>
            {

                PreviousQuiz.map((Quiz, values) => {
                    return <div key={values} style={{ backgroundColor: "yellow", marginBottom: 20 }}>
                        <div>
                            {Quiz ? <div>
                                <h2>Topic : {Quiz.Course}</h2>
                                <h2>Percentage : {Quiz.Percentage}%</h2>
                                <h2 > Grade :{Quiz.Grade}%</h2>
                            </div> : <div>dfddsfsdfsdf</div>}

                        </div>
                    </div>
                })
            }


        </div>
    )
}

export default MyQuizes
