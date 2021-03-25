import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"

function Results(props) {

    const [data, setdata] = useState([])
    const [UserId, setUserId] = useState("");
    const [Loading, setloading] = useState(true)

    console.log(UserId)
    console.log(data.length)

    const resultsData = JSON.parse(localStorage.getItem("results"))

    console.log(resultsData.language)

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                //   setUserId(uid)
                console.log(uid)

                let data = firebase.database().ref(`Students/${uid}/${resultsData.language}/Wrong Answer`)
                data.on("value", datasnap => {
                    console.log(datasnap.val())
                    setdata(Object.values(datasnap.val()) )
                    setloading(false)

                })


            } else {
                // User is signed out
                // ...
            }

        });




    }, [])





    if (Loading) {
        return <div><h1>loading</h1></div>
    }

    return (
        <div className="App">
            <div style={{border:"2px solid",width:"60%",textAlign:"center",margin:"auto",marginBottom:20}}>
            <img style={{borderRadius:"50%"}} src="https://lh3.googleusercontent.com/a-/AOh14GjvnFyz4-gATrtd2A6d8CojYCeYQgQxiw1-dZi-qg=s96-c" alt=""/>
            <h1>Name : {resultsData.Username}</h1>
            <h1> Course : {resultsData.language}</h1>
            <h1>Score :{resultsData.score}/10 </h1>
            <h2>Percentage : {resultsData.score/10 * 100} %</h2>
            
            
            <h2> Grade : {resultsData.score === 70 ? resultsData.grade = "A" : resultsData.score === 60 ? resultsData.grade = "B" : resultsData.score === 50 ? resultsData.grade = "C" : resultsData.score < 50 ? resultsData.grade = "FAIL":""}</h2>
            </div>
         
            {data.map((v, i) => {
    return (<div key={i} style={{ width: "60%", margin: "auto", border: "2px solid", padding: 20 }}>
        <h2>Q - {v.Question}</h2>
        <div><h4 style={{ backgroundColor: "green", color: "white", display: "flex", justifyContent: "space-around", height: 40, alignItems: "center" }}><span>Correct Answer : </span><span>{v.AnsChoosen}</span></h4></div>
        <div><h4 style={{ backgroundColor: "red", color: "white", display: "flex", justifyContent: "space-around", height: 40, alignItems: "center" }}><span>You Choosen : </span><span>{v.CrAnswer}</span></h4></div>
        {/* <div><h4 style={{backgroundColor:"red",color:"white"}}>You Choosen : {v.CrAnswer}</h4></div>  */}
    </div>

    )
})}

         
        </div>
        //     const resultsData = JSON.parse(localStorage.getItem("results"))
        //     return (
        //         <div className="App">
        //              <h1>Result</h1>

        //             <h1> Course : {resultsData.language}</h1> 
        //             <h1>Score 10 / {resultsData.score}</h1>

        //     )
        // }
    )
}
export default Results

