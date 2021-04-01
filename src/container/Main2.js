import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'

function Main2() {

    const history = useHistory();
    const [data, setdata] = useState([])
    const [quizes, setQuizes] = useState([])
    const [loading, setLoading] = useState(true)
    const [insitute, setinsitute] = useState("BMJ")
    const [condition] = useState("")

    useEffect(async () => {

        console.log(insitute)

        let data = await firebase.database().ref(`Jawaan_Pakistan/${insitute}/Web&Mobile`)
        data.once("value", datasnap => {
            console.log(Object.keys(datasnap.val()))
            console.log("here")//yaha tk chal rha is sy agy koi state set nai ho rhi
            setdata(Object.keys(datasnap.val()))
            console.log("here1")
            setQuizes(datasnap.val())
            console.log("here2")
            setLoading(false)//just ye wali state set ho rhi beeck ka miss ho rha
            console.log("chal rha")
        })

    }, [insitute])



    const handleQuizStatus = (name, status) => {
        firebase.database().ref(`Jawaan_Pakistan/${insitute}//Web&Mobile/${name}/Visible`).set(status)
            // firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${name}/Visible`).set(status)
            .then(() => alert("Quiz Status Changed"))
            .catch(error => alert(error.message))
    }


    if(!insitute){
        return <div>
            <h1>Loading</h1>
        </div>
    }

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
        {console.log("data==>", data)}
        {console.log("quizes==>", quizes)}
            {!loading && <div>
                {data.map((val, index) => {

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
