import React ,{useEffect,useState} from 'react'
import firebase from "../config/Firebase"


function Final() {
    const [data, setdata] = useState([])

    const [insitute, setinsitute] = useState("ADAMJEE")    
    const [course, setcourse] = useState("Web&Mobile")
    const [Topic, setTopic] = useState("HTML")



    useEffect(()=>{

        firebase.database().ref(`Jawaan_Pakistan/Results/${insitute}/${course}/${Topic}`)
        .on("value", datasnap => {
            console.log(datasnap.val())
            setdata(Object.values(datasnap.val()))
            console.log(Object.values(datasnap.val()))

            

        })
    },[])




    return (
        <div style={{textAlign:"center"}}>
            <div style={{backgroundColor:"black",color:"white",marginBottom:20,fontWeight:"bold"}}>  
            <h1>Results  :{insitute} Insitute</h1>
            <h1>Topic : {Topic} Quiz</h1>
            
            </div>
           

    <div> 
             {data.map((val,i)=>{
       return  <div style={{color:"red"}}>
           <h2 style={{backgroundColor:"blue",color:"white"}}> {val.Name}</h2>
           <div style={{backgroundColor:"beige"}}> 
           
           <h2 style={{fontWeight:"bold"}}> <span style={{color:"black"}}>  Topic </span> : {val.Course}</h2>
           <h2 style={{fontWeight:"bold"}}>Percentage: {val.Percentage} % </h2>
           <h2 style={{fontWeight:"bold"}}>Grade: {val.Grade}</h2>
           </div>
       </div>
             })}
             </div>

        </div>
    )
}

export default Final


