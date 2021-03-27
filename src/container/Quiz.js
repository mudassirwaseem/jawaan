import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from "../config/Firebase"

import {
    Link
} from "react-router-dom";


function Quiz(props) {
    const history = useHistory();

    const [data, setdata] = useState([])
    useEffect(async () => {


        let data = await firebase.database().ref("All Quiz")
        data.on("value", datasnap => {
            let quizes = datasnap.val()//yaha quizes wala pura node save ho gya 
 

            let enabled = []//ismain jo quiz visible hain unky names save hongy
            let keys = Object.keys(quizes)//ismain total jitny b quizes hain sb k name ae gy
            let totalQuizes = keys.length// or ye toal number of quizes show kry ga
            for (var i = 0; i < totalQuizes; i++) {//for loop ka pta h?
                if (quizes[keys[i]].Visible === "ON") enabled.push(keys[i])
                if (i === totalQuizes-1) setdata(enabled)
                console.log(i, quizes)
                // console.log(datasnap.val()[property])
            }
            // setdata(datasnap.val())
        })

    }, [])

    const LogOut = () => {

        firebase.auth().signOut().then(() => {
            history.replace('/Main')

        }).catch((error) => {
        });
    }
    return (

        <div className="App">
            <h1>Quiz</h1>
            <div style={{ marginTop: 40 }}>
                {/* <Link to={{pathname:"/Cs",name:"C++"}} > <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>C++</button> </Link> <br/>
            <Link to={{pathname:"/Cs",name:"Flutter"}} > <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>Flutter</button> </Link> <br/>
            <Link to={{pathname:"/Cs",name:"JAVASCRIPT"}} > <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>JAVASCRIPT QUIZ</button> </Link> <br/>
            <Link to={{pathname:"/Cs",name:"HTMLQUIZ"}}  >  <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>HTML & CSS QUIZ</button>  </Link> <br/>
            <Link to={{pathname:"/Cs",name:"PHYTHON"}}> <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>PYTHON QUIZ</button>  </Link> <br/>
            <Link to="/Admin"> <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>Add Quiz</button>  </Link> <br/>
                  <button onClick={LogOut}>Log Out</button> */}
                {/* {console.log(data)} */}
                {data.map((val,index) => {
                    console.log(val)
                    return <Link key={index} to={{ pathname: "/Cs", name: `${val}` }}> <button > <h1>{val}</h1></button></Link>

                })}
            </div>

            {}

        </div>
    )
}




export default Quiz
