import React,{useEffect,useState} from 'react'
import firebase from "../config/Firebase"

function Cs() {

const [data1,setdata1] = useState([])

    useEffect( async() => {
        let data = await firebase.database().ref(" AllQuiz/Flutter")
        data.on("value", datasnap => {
            console.log(datasnap.val())
            setdata1(Object.values(datasnap.val()) )
        })
        

    }, [])
   
    return (
        <div>

            {/* {data1.map((v,i)=>{
           return( <div>
               <h1>{v.}</h1>
           </div>

           )
            })} */}
            
        </div>
    )
}

export default Cs
