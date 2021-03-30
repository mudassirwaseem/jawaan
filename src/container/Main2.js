import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'

function Main2() {
    const history = useHistory();
    const [data, setdata] = useState([])
    const [quizes, setQuizes] = useState([])
    const [loading, setLoading] = useState(true)
    


    const [condition] = useState("")


    useEffect(async () => {


        let data = await firebase.database().ref("ADAMJEE/All Quiz")
        data.on("value", datasnap => {
            // console.log(datasnap.val())
            console.log(Object.keys(datasnap.val()))
            setdata(Object.keys(datasnap.val()))
            setQuizes(datasnap.val())
            setLoading(false)
        })

    }, [])


    // const googlesubmit = (() => {
    //     var provider = new firebase.auth.GoogleAuthProvider();
    //     firebase.auth()
    //         .signInWithPopup(provider)
    //         .then((result) => {
    //             /** @type {firebase.auth.OAuthCredential} */
    //             var credential = result.credential;
    //             var user = result.user;
    //             let userid = user.uid
    //             history.replace("/")
    //             let create_user = {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 profile: user.photoURL,
    //                 uid: user.uid,

    //             }
    //             console.log(create_user)
    //             firebase.database().ref(`Students/${userid}/PersonalData`).set(create_user)

    //             // ...
    //         }).catch((error) => {

    //             console.log(error.message)
    //         });
    // })

    const handleQuizStatus = (name, status) => {
        firebase.database().ref(`ADAMJEE/All Quiz/${name}/Visible`).set(status)
            .then(() => alert("Quiz Status Changed"))
            .catch(error => alert(error.message))
    }

    console.log(condition)

    return (
        <div>
           

            {!loading && <div>
                {data.map((val,index) => {

                    return <div >
                        <button key={index} > <h1>{val}</h1></button>
                        <select onChange={(e) => handleQuizStatus(val, e.target.value)} >
                            <option selected={quizes[val].Visible === "ON"} value="ON">ON</option>
                            <option selected={quizes[val].Visible === "OFF"} value="OFF">OFF</option>
                        </select>

                    </div>



                })}
            </div>}

        </div>
    )
}

export default Main2
