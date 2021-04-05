// import React, { useState } from 'react'
// import firebase from "../config/Firebase"


// function Admin() {
           
//     const [question, setquestion] = useState("")
//     const [option1, setoption1] = useState("")
//     const [option2, setoption2] = useState("")
//     const [option3, setoption3] = useState("")
//     const [option4, setoption4] = useState("")
//     const [answer, setanswer] = useState("")
//     const [insitute, setinsitute] = useState("BMJ")
//     const [Topic ,setTopic] = useState("")
//     const [course ,setcourse] = useState("Web&Mobile")
//     const [emptyCourse, setEmptyCourse] = useState(false)



//     const Savedata = () => {
//         let data = { question, option1, option2, option3, option4, answer, insitute }
//         // firebase.database().ref(`All Quiz/${course}/Questions`).push(data)
        
//         // firebase.database().ref(`Jawaan_Pakistan/${insitute}/All Quiz/${Topic}/Questions`).push(data)
//         firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${Topic}/Questions`).push(data)
//         firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${course}/${Topic}/Questions`).push(data)
//         // firebase.database().ref(`All Quiz/${course}/Visible`).set("OFF")

//         firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${Topic}/Visible`).set("OFF")
//         firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${course}/${Topic}/Visible`).set("OFF")
//         setquestion("")
//         setoption1("")  
//         setoption2("")
//         setoption3("")
//         setoption4("")
//         setanswer("")
        
//         if (Topic === "") {
//             setEmptyCourse(false)   
//         } else {
//             setEmptyCourse(true)
//         }

//         console.log(data)
//     }

//     return (
//         <div>
//             <div style={{ textAlign: "center" }}>
//                 <div>
                
//                     <select onChange={(e) => setinsitute(e.target.value)} >
//                         <option value="BMJ">BMJ</option>
//                         <option value="Saylani">SAYLANI</option>
//                         <option value="ADAMJEE">ADAMJEE</option>
//                     </select>
//                 </div>

//                 <div>
                    
//                     <select onChange={(e) => setcourse(e.target.value)} >
//                         <option value="Web&Mobile">Web&Mobile</option>
//                         <option value="CCNA">CCNA</option>
//                         <option value="GraphicDesigning">Graphic Designing</option>
//                     </select>
//                 </div>

//                 {/* <input value={course} placeholder="course" onChange={(e) => setcourse(e.target.value)} /> <br /> */}
          
//                 <div>
         
//                     {emptyCourse ? <input value={Topic} disabled placeholder="Select Topic " onChange={(e) => setTopic(e.target.value)} /> : <input value={Topic} placeholder="Select Course " onChange={(e) => setTopic(e.target.value)} />}
//                 </div>

//                 {/* <input value={question} placeholder="Questions" onChange={(e) => setquestion(e.target.value)} /> <br /> */}
//                 <input value={question} placeholder="Questions" onChange={(e) => setquestion(e.target.value)} /> <br />
//                 <input value={option1} placeholder="Option1" onChange={(e) => setoption1(e.target.value)} /> <br />
//                 <input value={option2} placeholder="Option2" onChange={(e) => setoption2(e.target.value)} /> <br />
//                 <input value={option3} placeholder="Option3" onChange={(e) => setoption3(e.target.value)} /> <br />
//                 <input value={option4} placeholder="Option4" onChange={(e) => setoption4(e.target.value)} /> <br />
//                 <input value={answer} placeholder="Answer" onChange={(e) =>  setanswer(e.target.value)} /> <br />

//                 <button onClick={Savedata}> Save</button>
//             </div>
//         </div>
//     )
// }


// export default Admin




import React, { useState } from 'react'
import firebase from "../config/Firebase"


function Admin() {
           
    const [question, setquestion] = useState("")
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [option4, setoption4] = useState("")
    const [answer, setanswer] = useState("")
    const [insitute, setinsitute] = useState("BMJ")
    const [Topic ,setTopic] = useState("")
    const [course ,setcourse] = useState("Web&Mobile")  

    const [emptyCourse, setEmptyCourse] = useState(false)



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

        let fulldata = {
            Options:arr,
            Question: question,
            Answer : answer
        }
        

        // firebase.database().ref(`All Quiz/${course}/Questions`).push(data)
        
        // firebase.database().ref(`Jawaan_Pakistan/${insitute}/All Quiz/${Topic}/Questions`).push(data)
        firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${Topic}/Questions`).push(fulldata)
        firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${course}/${Topic}/Questions`).push(fulldata)
    
        // firebase.database().ref(`All Quiz/${course}/Visible`).set("OFF")

        firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${Topic}/Visible`).set("OFF")
        firebase.database().ref(`Jawaan_Pakistan/AllQuizs/${course}/${Topic}/Visible`).set("OFF")
        setquestion("")
        setoption1("")  
        setoption2("")
        setoption3("")
        setoption4("")
        setanswer("")
        
        if (Topic === "") {
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

                {/* <input value={course} placeholder="course" onChange={(e) => setcourse(e.target.value)} /> <br /> */}
          
                <div>
         
                    {emptyCourse ? <input value={Topic} disabled placeholder="Select Topic " onChange={(e) => setTopic(e.target.value)} /> : <input value={Topic} placeholder="Select Course " onChange={(e) => setTopic(e.target.value)} />}
                </div> 

                {/* <input value={question} placeholder="Questions" onChange={(e) => setquestion(e.target.value)} /> <br /> */}
                <input value={question} placeholder="Questions" onChange={(e) => setquestion(e.target.value)} /> <br />
                <input value={option1} placeholder="Option1" onChange={(e) => setoption1(e.target.value)} /> <br />
                <input value={option2} placeholder="Option2" onChange={(e) => setoption2(e.target.value)} /> <br />
                <input value={option3} placeholder="Option3" onChange={(e) => setoption3(e.target.value)} /> <br />
                <input value={option4} placeholder="Option4" onChange={(e) => setoption4(e.target.value)} /> <br />
                <input value={answer} placeholder="Answer" onChange={(e) =>  setanswer(e.target.value)} /> <br />

                <button onClick={Savedata}> Save</button>
            </div>
        </div>
    )
}


export default Admin

