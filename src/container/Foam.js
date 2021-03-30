import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Foam() {
    
    const history = useHistory();
    const [Gender, setGender] = useState("")
    const [Insitute, setInsitute] = useState("")
    const [City, setCity] = useState("")
    const [Number, setNumber] = useState("")
    const [uid, setUserId] = useState("")
    const [course, setcourse] = useState("")

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                var user = user.displayName
                setUserId(uid)
                // console.log(uid)
                console.log(user)
            }
        })

    })

    const Submit = () => {
        let Data = { Gender, Insitute, City, Number, course }

        firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail`).set(Data)

        history.replace("/Quiz2")
    }
    return (
        <div>
            <h1>Fill Your Information</h1>
            <div>

                <input value={Gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} /> <br />
                <select onChange={(e) => setInsitute(e.target.value)} >
                    <option selected disabled>Select institute</option>
                    <option value="BMJ">BMJ</option>
                    <option value="ADAMJEE">ADAMJEE</option>
                    <option value="Saylani">Saylani</option>
                </select>   <br />
                <select onChange={(e) => setcourse(e.target.value)} >
                    <option selected disabled>Select institute</option>
                    <option value="Web&Mobile">Web&Mobile</option>
                    <option value="GraphicDesigning">GraphicDesigning</option>
                    <option value="CCNA">CCNA</option>
                </select>   <br />
                <input value={City} placeholder="City" onChange={(e) => setCity(e.target.value)} /> <br />
                <input value={Number} placeholder="Number" onChange={(e) => setNumber(e.target.value)} /> <br />
                <button onClick={Submit}> Submit</button>
            </div>

        </div>
    )
}

export default Foam
