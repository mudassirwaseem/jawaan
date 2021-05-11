import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'

function Main2() {

    const history = useHistory();
   
    const [insitute, setinsitute] = useState("BMJ")
    const [Course, setCourse] = useState("Web&Mobile")


    useEffect(async () => {

        console.log(insitute)

        // let data = await firebase.database().ref(`Jawaan_Pakistan/${insitute}/${Topic}`)
        // data.once("value", datasnap => {
        //     console.log(Object.keys(datasnap.val()))
        //     setdata(Object.keys(datasnap.val()))
        //     setQuizes(datasnap.val())
        //     setLoading(false)
        // })

    }, [insitute])

    const setAttendence = (val) => {
        firebase.database().ref(`Attendense/${insitute}/${Course}/shedule/`).set(val)
            .then(() => console.log("updated"))
            .catch(error => alert(error.message))
    }


    return (
        <div className="App">

 <div>
 <select onChange={(e) => setinsitute(e.target.value)} >
     <option selected value="BMJ">BMJ</option>
     <option value="ADAMJEE">ADAMJEE</option>
     <option value="Saylani">Saylani</option>
 </select>
 </div>



 <div>
 <select onChange={(e) => setCourse(e.target.value)} >
     <option selected value="Web&Mobile">Web&Mobile</option>
     <option value="GraphicDesigning">GraphicDesigning</option>
     <option value="CCNA">CCNA</option>
 </select>
 </div>
            <h1>Attendence</h1>
            <select onChange={(e) => setAttendence(e.target.value)} >
                <option selected value="ON">ON</option>
                <option value="OFF">OFF</option>
            </select>

        </div>
    )
}

export default Main2







// <div>
// <select onChange={(e) => setinsitute(e.target.value)} >
//     {/* <option selected disabled>Select institute</option> */}
//     <option value="BMJ">BMJ</option>
//     <option value="ADAMJEE">ADAMJEE</option>
//     <option value="Saylani">Saylani</option>
// </select>
// </div>
// {console.log("data==>", data)}
// {console.log("quizes==>", quizes)}
// {!loading && <div>
// {data.map((val, index) => {

//     return <div >
//         <button key={index} > <h1>{val}</h1></button>
//         <select onChange={(e) => handleQuizStatus(val, e.target.value)} >
//             <option selected={quizes[val].Visible === "ON"} value="ON">ON</option>
//             <option selected={quizes[val].Visible === "OFF"} value="OFF">OFF</option>
//         </select>

//     </div>

// })}

// </div>}