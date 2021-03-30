import React,{useState,useEffect} from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Foam() {
    const history = useHistory();
    const [Gender, setGender] = useState("")
    const [Insitute, setInsitute] = useState("")
    const [City, setCity] = useState("")
    const [Number, setNumber] = useState("")
    const [uid, setUserId] = useState("")

useEffect(()=>{

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
    } )

})

    const Submit=()=>{
        let Data = {Gender,Insitute,City,Number}

        firebase.database().ref(`AllStudents/${uid}/AllData`).set(Data)

        history.replace("/Quiz2")
    }
    return (
        <div>
            <h1>Fill Your Information</h1> 
            <div>
                
            <input value={Gender}  placeholder="Gender" onChange={(e) => setGender(e.target.value)} /> <br />
                <input  value={Insitute} placeholder="Insitute" onChange={(e) => setInsitute(e.target.value)} /> <br />
                <input value={City}  placeholder="City" onChange={(e) => setCity(e.target.value)} /> <br />
                <input value={Number}  placeholder="Number" onChange={(e) => setNumber(e.target.value)} /> <br />
               <button onClick={Submit}> Submit</button>
            </div>

        </div>
    )
}

export default Foam
