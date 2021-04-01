import React ,{useEffect,useState} from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Final() {
    const [data, setdata] = useState([])




    useEffect(()=>{
        firebase.database().ref(`Jawaan_Pakistan/Results/ADAMJEE/Web&Mobile/Javascript`)
        .on("value", datasnap => {
            console.log(datasnap.val())
            setdata(Object.values(datasnap.val()))
            console.log(Object.values(datasnap.val()))

        })
    },[])
   


    return (
        <div>
             <h1>Final</h1>
             {data.map((val,i)=>{
       return  <div>
           <h2> {val.Name}</h2>
           <li>Percentage: {val.Percentage}</li>
           <li>Grade: {val.Grade}</li>

       </div>
             })}

        </div>
    )
}

export default Final
