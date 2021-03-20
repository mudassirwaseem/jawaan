import React, { useState,useEffect } from 'react'
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import { HTMLQUIZ } from "../store/Action/Action"

function HtmlQu(props) {
    const history = useHistory();
    const [quiz, setquiz] = (props.HtmlCss)
    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [Loading, setloading] = useState(true)
    const [optionChosen, setOptionChosen] = useState("");
    let [score, setScore] = useState(0);
    const [language, setlanguage] = useState("Html");
    const [timer, setTimer] = useState({
        min: 4,
        sec: 59,
      });

    useEffect(()=>{
        
        click()
      },[])

      const Result = {
        score,
        language
    }

      if(timer.min === 0 && timer.sec === 0 ){
        localStorage.setItem("results", JSON.stringify(Result))
        history.replace("/Results",Result)
      }

    const click = () => {
        setInterval(() => {
          setTimer((state, props) => {
            return {
              min: state.sec == 0 ? state.min - 1 : state.min,
              sec: state.sec == 0 ? 59 : state.sec - 1,
            };
          });
        }, 1000);
      };

    const chooseOption = (option) => {
        setOptionChosen(option);
        console.log(optionChosen)
    };

    const Submit = () => {
        localStorage.setItem("results", JSON.stringify(Result))
        history.replace("/Results", Result)
    }

    const PreQuestion = () => {
        if (currentQuestion === 0) {
            setCurrentQuestion(currentQuestion);
        } else {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

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




    // const Result = {
    //     score,
    //     language
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
        return <div className="App"><h1>loading</h1></div>
    }
    return (
        <div>   
            <div style={{marginBottom:50,textAlign:"center"}}>
            <h1 style={{borderBottom:"2px solid"}}>HTML QUIZ</h1>
            </div>

          <div style={{width:"70%",margin:"auto",backgroundColor:"black",padding:20}}>
        <div style={{color:"white"}}>
        {timer.min < 10 ? "0" + timer.min : timer.min}:
        {timer.sec < 10 ? "0" + timer.sec : timer.sec}
        </div>
          <div style={{color:"white",textAlign:"center"}}>
            
            <h2 > Q{currentQuestion + 1} : {quiz[currentQuestion].question} </h2> 

          </div>
            <button style={{ border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption(quiz[currentQuestion].option1); }}>A )   {quiz[currentQuestion].option1} </h3> </button> <br/>
           <button style={{ border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption(quiz[currentQuestion].option2); }}>A )   {quiz[currentQuestion].option2} </h3> </button> <br/>
           <button style={{border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption(quiz[currentQuestion].option3); }}>A )   {quiz[currentQuestion].option3} </h3> </button> <br/>
           <button style={{border:"none" ,width:"100%" , backgroundColor:"black" , marginTop:10 ,color:"white"}}>  <h3 style={{width: '100%'}} onClick={() => { chooseOption(quiz[currentQuestion].option4); }}>A )   {quiz[currentQuestion].option4} </h3> </button> <br/> 
       
        <div style={{textAlign:"center"}}>

        
        {currentQuestion == quiz.length - 1 ? (
             <>
                        <button onClick={finishQuiz} id="nextQuestion"  style={{width:"40%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                            Finish Quiz
                        </button>
                         <button onClick={PreQuestion} id="nextQuestion"  style={{width:"40%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                         Previous
                     </button>
                     </>
                    ) : (
                        <>
                        <button onClick={PreQuestion} id="nextQuestion"  style={{width:"40%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                            Previous
                        </button>
                        <button onClick={nextQuestion} id="nextQuestion"  style={{width:"40%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                            Next Question
                        </button>
                        <br/>
                        <button onClick={Submit} id="nextQuestion"  style={{width:"40%",backgroundColor:"white",height:40,borderRadius:20,marginTop:30,textAlign:"center"}}>
                        Submit
                        </button>
                        </>
                    )}  
         </div>
         </div>

        </div>
    )
}

const mapstatetoprops = (state) => ({
    HtmlCss: state.HtmlCss
})

const mapdispatchtoprops = (dispatch) => ({
    HTMLQUIZ: () => dispatch(HTMLQUIZ()),
})
export default connect(mapstatetoprops, mapdispatchtoprops)(HtmlQu)
