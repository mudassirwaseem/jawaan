import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'

function Main2() {

    const history = useHistory();
    const [data, setdata] = useState([])
    const [quizes, setQuizes] = useState([])
    const [loading, setLoading] = useState(true)
    const [insitute, setinsitute] = useState("Saylani")
    const [condition] = useState("")

    console.log(insitute)

    useEffect(async () => {

        let data = await firebase.database().ref(`Jawaan_Pakistan/${insitute}/All Quiz`)
        data.on("value", datasnap => {
            // console.log(datasnap.val())
            console.log(Object.keys(datasnap.val()))
            setdata(Object.keys(datasnap.val()))
            setQuizes(datasnap.val())
            setLoading(false)
            console.log("chal rha")
       
        })

    }, [insitute])

    const handleQuizStatus = (name, status) => {
        firebase.database().ref(`Jawaan_Pakistan/${insitute}/All Quiz/${name}/Visible`).set(status)
        // firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${name}/Visible`).set(status)
            .then(() => alert("Quiz Status Changed"))
            .catch(error => alert(error.message))
    }

    console.log(condition)

    return (
        <div>
           <div>
               <select onChange={(e) => setinsitute(e.target.value)} >
                   {/* <option selected disabled>Select institute</option> */}
                   <option value="BMJ">BMJ</option>
                   <option value="ADAMJEE">ADAMJEE</option>
                   <option value="Saylani">Saylani</option>
               </select>
           </div>

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
