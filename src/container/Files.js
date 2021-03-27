import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'
function Files() {
    const history = useHistory();
    const [Gender, setgender] = useState("")
    const [Age, setAge] = useState("")
    const [City, setCity] = useState("")
    const [Country, setCountry] = useState("")
    const [Id, setId] = useState("")
    const [UserData, setUserData] = useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                //   setUserId(uid)
                console.log(uid)
                setId(uid)
            } else {

            }
        });
    }, [])

    



    return (
        <div className="App">
            <input value={Gender} placeholder="Set Gender" onChange={(e) => setgender(e.target.value)} /> <br />
            <input value={Age} placeholder="Set Age" onChange={(e) => setAge(e.target.value)} /> <br />
            <input value={City} placeholder="Set City" onChange={(e) => setCity(e.target.value)} /> <br />
            <input value={Country} placeholder="Set Country" onChange={(e) => setCountry(e.target.value)} /> <br />
            <button >Submit</button>

        </div>
    )
}

export default Files
