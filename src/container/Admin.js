import React, { useState } from 'react'
import firebase from "../config/Firebase"

function Admin() {

    const [question, setquestion] = useState("")
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [option4, setoption4] = useState("")
    const [answer, setanswer] = useState("")
    const [course, setcourse] = useState("")
    const [Topic, setTopic] = useState("")
    const [insitute, setinsitute] = useState("")

    const [emptyCourse, setEmptyCourse] = useState(false)
    const [optionSelected, setOptionSelected] = useState("unselected")


    const Savedata = () => {

        let data = [option1,option2 ,option3,option4]

        let arr = []

        let arr2 = []

         for(let i = 0; i<data.length ;i++){

          if(data[i] !== "" || 0 ){
            
              arr.unshift(data[i])
            }else if(i === ""  ){
                arr2.unshift(data[i])      
          }
         }

        let data1 = question
        let data2 = answer
        
        let fulldata ={
            Options:arr,
            Question: data1,
            Answer : data2
        }
        
        

        firebase.database().ref(`All Quiz/${insitute}/${course}/${Topic}/Questions`).push(fulldata)
        firebase.database().ref(`All Quiz/${insitute}/${course}/${Topic}/Visible`).set("OFF")
        setquestion("");
        setoption1("")
        setoption2("")
        setoption3("")
        setoption4("")
        setanswer("")

        if (course === "") {
            setEmptyCourse(false)
        } else {
            setEmptyCourse(true)
        }

        console.log(data)
    }


    return (
        <div>
            <div style={{ textAlign: "center" }}>
               
                <div>
                    
                    <select onChange={(e) => setinsitute(e.target.value)} >
                        <option value="BMJ">BMJ</option>
                        <option value="Saylani">SAYLANI</option>
                        <option value="ADAMJEE">ADAMJEE</option>
                    </select>
                </div>

                <div>
                    
                    <select onChange={(e) => setcourse(e.target.value)} >
                        <option value="Web&Mobile">Web&Mobile</option>
                        <option value="CCNA">CCNA</option>
                        <option value="GraphicDesigning">Graphic Designing</option>
                    </select>
                </div>
                <div>
                    {emptyCourse ? <input value={Topic} disabled placeholder="Select Course " onChange={(e) => setTopic(e.target.value)} /> : <input value={Topic} placeholder="Select Topic " onChange={(e) => setTopic(e.target.value)} />}
                </div>
                <input value={question} placeholder="Questions" onChange={(e) => setquestion(e.target.value)} /> <br />
                <input value={option1} placeholder="Option1" onChange={(e) => setoption1(e.target.value)} /> <br />
                <input value={option2} placeholder="Option1" onChange={(e) => setoption2(e.target.value)} /> <br />
                <input value={option3} placeholder="Option1" onChange={(e) => setoption3(e.target.value)} /> <br />
                <input value={option4} placeholder="Option1" onChange={(e) => setoption4(e.target.value)} /> <br />
                <input value={answer} placeholder="Answer" onChange={(e) => setanswer(e.target.value)} /> <br />

                <button onClick={Savedata}> Save</button>
            </div>
        </div>
    )
}


export default Admin
