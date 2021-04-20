// import React, { useState, useEffect } from 'react'
// import firebase from "../config/Firebase"
// import { useHistory } from 'react-router-dom'


// function Foam() {

//     const history = useHistory();
//     const [Gender, setGender] = useState("")
//     const [Insitute, setInsitute] = useState("")
//     const [City, setCity] = useState("")
//     const [Number, setNumber] = useState("")
//     const [uid, setUserId] = useState("")
//     const [course, setcourse] = useState("")

    // useEffect(() => {

    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             var uid = user.uid;
    //             var user = user.displayName
    //             setUserId(uid)
    //             // console.log(uid)
    //             console.log(user)
    //         }
    //     })

    // })

//     const Submit = () => {
//         let Data = { Gender, Insitute, City, Number, course }

        // firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail`).set(Data)
        // firebase.database().ref(`Jawaan_Pakistan/ALL USERS/${uid}/Profile/OtherDetails`).set(Data)
        
//         history.replace("/Quiz2")
//     }
//     return (
//         <div className="App">
            
//             <h1>Fill Your Information</h1>
//             <div>

//                 <input value={Gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} /> <br />
//                 <select onChange={(e) => setInsitute(e.target.value)} >
//                     <option selected disabled>Select institute</option>
//                     <option value="BMJ">BMJ</option>
//                     <option value="ADAMJEE">ADAMJEE</option>
//                     <option value="Saylani">Saylani</option>
//                 </select>   <br />
//                 <select onChange={(e) => setcourse(e.target.value)} >
//                     <option selected disabled>Select institute</option>
//                     <option value="Web&Mobile">Web&Mobile</option>
//                     <option value="GraphicDesigning">GraphicDesigning</option>
//                     <option value="CCNA">CCNA</option>
//                 </select>   <br />
//                 <input value={City} placeholder="City" onChange={(e) => setCity(e.target.value)} /> <br />
//                 <input value={Number} placeholder="Number" onChange={(e) => setNumber(e.target.value)} /> <br />
//                 <button onClick={Submit}> Submit</button>
//             </div>

//         </div>
//     )
// }

// export default Foam

import React ,{useEffect,useState} from 'react'
import { Formik } from "formik"
import { useHistory } from 'react-router-dom'
import firebase from "../config/Firebase"
import * as yup from 'yup';



const reviewSchema = yup.object({
    city: yup.string().required('City is Required').min(4),
    Number: yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 11 digits'),
    address: yup.string().required('Address is Required').min(4).max(42),
})


function Foam() {
    const [uid, setUserId] = useState("")
    
    const history = useHistory();

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

    },[])


    

    return (
        <div className="App">
            <Formik
                validationSchema={reviewSchema}
                initialValues={{
                    city: "",
                    Number: "",
                    Gender: "",
                    address: "",
                    Insitute:"",
                    Course:""

                    
                }}
                onSubmit={(values) => {
                    firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail`).set(values)
                    firebase.database().ref(`Jawaan_Pakistan/ALL USERS/${uid}/Profile/OtherDetails`).set(values)
                    history.replace("/Quiz2")
                    console.log(values)
                }}

            >
                {(props) => (
                    <div style={{ textAlign: "center" }}>
                        <select onChange={props.handleChange(`Insitute`)} >
                            <option selected disabled>Select institute</option>
                            <option value="BMJ">BMJ</option>
                            <option value="ADAMJEE">ADAMJEE</option>
                            <option value="Saylani">Saylani</option>
                        </select>   <br />
                        <select onChange={props.handleChange(`Course`)} >
                    <option selected disabled>Select institute</option>
                    <option value="Web&Mobile">Web&Mobile</option>
                    <option value="GraphicDesigning">GraphicDesigning</option>
                    <option value="CCNA">CCNA</option>
                </select>   <br />

                <select onChange={props.handleChange(`Gender`)} >
                    <option selected disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>   <br />

                        <input type="text" placeholder="City" onChange={props.handleChange(`city`)} onBlur={props.handleBlur("city")} /> <br />
                        <p>{props.touched.city && props.errors.city}</p>

                        <input type="number" placeholder="Number" onChange={props.handleChange(`Number`)} onBlur={props.handleBlur("Number")} /> <br />
                        <p>{props.touched.Number && props.errors.Number}</p>

                     
                        <input type="text" placeholder="Address" onChange={props.handleChange(`address`)} onBlur={props.handleBlur("address")} /> <br />
                        <p>{props.touched.address && props.errors.address}</p>

                        <button onClick={props.handleSubmit}>submit</button>
                    </div>
                )}

            </Formik>


        </div>
    )
}

export default Foam

