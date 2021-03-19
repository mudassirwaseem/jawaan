import React ,{useState} from 'react'
import {connect} from "react-redux"
import { useHistory } from 'react-router-dom'

import {JAVASCRIPT} from "../store/Action/Action"


function JavascriptQu(props) {
    const history = useHistory();
    const [ quiz ,setquiz ] = (props.Javascript)
    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [Loading, setloading] = useState(true)
    const [optionChosen, setOptionChosen] = useState("");
    let [score, setScore] = useState(0);
    const [language, setlanguage] = useState("Python");




    console.log(quiz)

    const chooseOption = (option) => {
        setOptionChosen(option);
        console.log(optionChosen)

    };


    const nextQuestion = () => {
        if (optionChosen !== "") {

            if (quiz[currentQuestion].answer == optionChosen) {
                setScore(++score);
                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("")


            } else if (quiz[currentQuestion].answer !== optionChosen) {

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("");
            }
         
        } else {
            alert("choose the option")

        }


        console.log(optionChosen)
    };


    const Result = {
        score,
        language
    }



    const finishQuiz = () => {
        if (quiz[currentQuestion].answer == optionChosen) {
            setScore(++score);
            alert(score)
            localStorage.setItem("results", JSON.stringify(Result))
            console.log("chl rhaa")
            history.replace('/Results')
        } else if (quiz[currentQuestion].answer !== optionChosen) {
            setScore(score);
            alert(score)
            localStorage.setItem("results", JSON.stringify(Result))
            console.log("chl rhaa")
            history.replace('/Results')
        }
    };




    if (!quiz) {
             return <div><h1>loading</h1></div>
         }
    return (
        <div>   
            <div style={{marginBottom:50,textAlign:"center"}}>
            <h1 style={{borderBottom:"2px solid"}}>JAVASCRIPT QUIZ</h1>
            </div>

          <div style={{width:"70%",margin:"auto",backgroundColor:"black",padding:20}}>

          <div style={{color:"white",textAlign:"center"}}>
            
            <h2 > Q{currentQuestion + 1} : {quiz[currentQuestion].question} </h2> 

          </div>
            <button style={{ border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption("option1"); }}>A )   {quiz[currentQuestion].option1} </h3> </button> <br/>
           <button style={{ border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption("option2"); }}> B )   {quiz[currentQuestion].option2} </h3> </button> <br/>
           <button style={{border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption("option3"); }}> C )   {quiz[currentQuestion].option4} </h3> </button> <br/>
           <button style={{border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption("option4"); }}> D )   {quiz[currentQuestion].option3} </h3> </button> <br/> 
       
        <div style={{textAlign:"center"}}>

         {currentQuestion == quiz.length - 1 ? (
                        <button onClick={finishQuiz} id="nextQuestion"  style={{width:"80%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                            Finish Quiz
                        </button>
                    ) : (
                        <button onClick={nextQuestion} id="nextQuestion"  style={{width:"80%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                            Next Question
                        </button>
                    )}  
         </div>
         </div>

        </div>

    )
}
const mapstatetoprops =(state)=>({
    Javascript : state.Javascript
    })

const mapdispatchtoprops =(dispatch)=>({
    JAVASCRIPT : ()=> dispatch(JAVASCRIPT()),
    })
export default connect(mapstatetoprops,mapdispatchtoprops) (JavascriptQu)
