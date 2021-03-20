import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

function Results() {
    const [data, setdata] = useState([])  

    useEffect( async() => {
        let data = await firebase.database().ref(`UserData1/Uid/Python/Wrong Answer`)
        data.on("value", datasnap => {
            console.log(datasnap.val())
            setdata(Object.values(datasnap.val()))
        })

    }, [])

    const resultsData = JSON.parse(localStorage.getItem("results"))
    return (
        <div className="App">
            <h1>Result</h1>
            <h1> Course : {resultsData.language}</h1>
            <h1>Score {resultsData.score}/10 </h1>
            
            {data.map((v, i) => {
                return(<div style={{width:"60%",margin:"auto",border:"2px solid",padding:20}}>
                    <h2>Q - {v.Question}</h2>
                    <div><h4 style={{backgroundColor:"green",color:"white", display:"flex",justifyContent:"space-around",height:40,alignItems:"center"}}><span>Correct Answer : </span><span>{v.AnsChoosen}</span></h4></div> 
                    <div><h4 style={{backgroundColor:"red",color:"white", display:"flex",justifyContent:"space-around",height:40,alignItems:"center"}}><span>You Choosen : </span><span>{v.CrAnswer}</span></h4></div> 
                   {/* <div><h4 style={{backgroundColor:"red",color:"white"}}>You Choosen : {v.CrAnswer}</h4></div>  */}
                    </div>

                )
                

            })}
        </div>
    )
}

export default Results
