import React,{useEffect,useState} from 'react'
import firebase from "../config/Firebase"

function Cs() {

const [data1,setdata1] = useState([])
const [loading,setloading] = useState(true)
let [currentQuestion, setCurrentQuestion] = useState(0);
const [Quizlength, setQuizlength] = useState("");

 console.log(data1.length)

const Next =()=>{
    setCurrentQuestion(currentQuestion + 1)
}

    useEffect( async() => {
        let data = await firebase.database().ref("JAVASCRIPT")
        data.on("value", datasnap => {
            console.log(datasnap.val())
            setdata1(Object.values(datasnap.val()) )
            setloading(false)
        })

    }, [])


    if(loading){
        return <div>
            <h1>Loading</h1>
        </div>
    }
   
    return (
        <div>
            <h2>{data1[currentQuestion].question} ?</h2>
            <h3>{data1[currentQuestion].option1}</h3>
            <h3>{data1[currentQuestion].option2}</h3>
            <h3>{data1[currentQuestion].option3}</h3>
            <h3>{data1[currentQuestion].option4}</h3>

            <button onClick={Next}> Next</button>
            

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
