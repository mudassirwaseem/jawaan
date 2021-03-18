import React ,{useState} from 'react'
import {connect} from "react-redux"
import { useHistory } from 'react-router-dom'

import {PHYTHON} from "../store/Action/Action"


function PythonQu(props) {
    const history = useHistory();
    const [ quiz ,setquiz ] = (props.Python)

    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [Loading, setloading] = useState(true)
    const [optionChosen, setOptionChosen] = useState("");
    let [score, setScore] = useState(0);



    console.log(quiz)

    const chooseOption = (option) => {
        setOptionChosen(option);
        console.log(optionChosen)

    };


    const nextQuestion = () => {
        if (optionChosen !== "") {
            console.log(quiz[currentQuestion].answer,optionChosen)
            
            if (quiz[currentQuestion].answer == optionChosen) {
                setScore(++score);
                alert(score)
                setCurrentQuestion(currentQuestion + 1);


                // console.log(score)
            } else if (quiz[currentQuestion].answer !== optionChosen) {
                alert(score)

                setCurrentQuestion(currentQuestion + 1);
            }
            else if (optionChosen !== "") {
                setCurrentQuestion(currentQuestion);
            }
            /* if(Question[currentQuestion ] > 0) {
                if(optionChosen !== "") {
                    alert("choose the option")
                }
            }  */
        } else {
            alert("choose the option")

        }


        console.log(optionChosen)
    };


    const finishQuiz = () => {
        if (quiz[currentQuestion].answer == optionChosen) {
            setScore(++score);
            alert(score)
            history.replace('/Results')
            localStorage.setItem("userscore", score)
        }
    };



    if (!quiz) {
             return <div><h1>loading</h1></div>
         }
    return (
        <div>
            <div style={{marginBottom:50}}>

            <h1 style={{borderBottom:"2px solid"}}>PHYTHON QUIZ</h1>
            </div>
            <h2 > Q{currentQuestion + 1} : {quiz[currentQuestion].question} </h2> 
           <button style={{width:450 , backgroundColor:"#1a1aff",marginTop:10 ,color:"white"}}>  <h4 onClick={() => { chooseOption("option1"); }}>{quiz[currentQuestion].option1} </h4> </button> <br/>
           <button style={{width:450 ,backgroundColor:"#1a1aff",marginTop:10 ,color:"white"}}>  <h4 onClick={() => { chooseOption("option2"); }}>{quiz[currentQuestion].option2} </h4> </button> <br/>
           <button style={{width:450 ,backgroundColor:"#1a1aff",marginTop:10 ,color:"white"}}>  <h4 onClick={() => { chooseOption("option3"); }}>{quiz[currentQuestion].option4} </h4> </button> <br/>
           <button style={{width:450 ,backgroundColor:"#1a1aff",marginTop:10 ,color:"white"}}>  <h4 onClick={() => { chooseOption("option4"); }}>{quiz[currentQuestion].option3} </h4> </button> <br/> 
         <div>
         {currentQuestion == quiz.length - 1 ? (
                        <button onClick={finishQuiz} id="nextQuestion"  style={{width:300,backgroundColor:"yellow",height:40,borderRadius:20,marginTop:30}}>
                            Finish Quiz
                        </button>
                    ) : (
                        <button onClick={nextQuestion} id="nextQuestion"  style={{width:300,backgroundColor:"yellow",height:40,borderRadius:20,marginTop:30}}>
                            Next Question
                        </button>
                    )}  
         </div>
        </div>

    )
}
const mapstatetoprops =(state)=>({
    Python : state.Python
    })

const mapdispatchtoprops =(dispatch)=>({
    PHYTHON : ()=> dispatch(PHYTHON()),
    })
export default connect(mapstatetoprops,mapdispatchtoprops) (PythonQu)
