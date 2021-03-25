import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import firebase from "../config/Firebase"
import { HTMLQUIZ } from "../store/Action/Action"
import { Spinner } from "react-bootstrap";



function HtmlQu(props) {
    const history = useHistory();
    const [quiz, setquiz] = (props.HtmlCss)
    let   [currentQuestion, setCurrentQuestion] = useState(0);
    const [Loading, setloading] = useState(true)
    const [optionChosen, setOptionChosen] = useState("");
    let   [score, setScore] = useState(0);
    const [language, setlanguage] = useState("HtmlCss");
    const [UserId, setUserId] = useState("");
    const [Username, setUsername] = useState("");
    const [QuizLength, setQuizLength] = useState("");

    const [timer, setTimer] = useState({
        min: 4,
        sec: 59,
    });
 
    // let len = quiz.length
    // setQuizLength(len)
    
    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              var user = user.displayName
              setUserId(uid)
              setUsername(user)
              console.log(uid)
              console.log(user)
              // ...
            } else {
              // User is signed out
              // ...
            }
            
        });
        
        click()
    }, [])


    // console.log(QuizLength)




    const Result = {
        score,
        language,
        Username

        
    }

    if (timer.min === 0 && timer.sec === 0) {
        localStorage.setItem("results", JSON.stringify(Result))
        history.replace("/Results", Result)
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
    };

    const nextQuestion = () => {
        if (optionChosen !== "") {
            if (quiz[currentQuestion].answer == optionChosen) {
               
                setScore(++score);

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("")
            } else if (quiz[currentQuestion].answer !== optionChosen) {


                let data = {
                    Question: quiz[currentQuestion].question,
                    CrAnswer: quiz[currentQuestion].answer,
                    AnsChoosen: optionChosen
                }

                console.log(data)

                firebase.database().ref(`Students/${UserId}/${language}`).child("Wrong Answer").push(data)

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("");
            }
        } else {
            alert("choose the option")
        }
    };


    const Submit = () => {
        localStorage.setItem("results", JSON.stringify(Result))
        history.replace("/Results", Result)

    };

    // const PreQuestion = () => {
    //     if (currentQuestion === 0) {
    //         setCurrentQuestion(currentQuestion);
    //     } else {
    //         setCurrentQuestion(currentQuestion - 1);
    //     }
    // };

    const finishQuiz = () => {
        if (quiz[currentQuestion].answer == optionChosen) {
            setScore(++score); 
            firebase.database().ref(`Students/${UserId}/${language}/`).push({ score })
            alert(score)
            localStorage.setItem("results", JSON.stringify(Result))
            // console.log("chl rhaa")
            history.replace('/Results')
        } else if (quiz[currentQuestion].answer !== optionChosen) {
            setScore(score);

            let data = {
                Question: quiz[currentQuestion].question,
                CrAnswer: quiz[currentQuestion].answer,
                AnsChoosen: optionChosen
            }

            firebase.database().ref(`Students/${UserId}/${language}/`).push({ score })
            firebase.database().ref(`Students/${UserId}/${language}`).child("Wrong Answer").push(data)
          alert(score)
            localStorage.setItem("results", JSON.stringify(Result))
            // console.log("chl rhaa")
            history.replace('/Results')
        }
    };

   

   


    if (!quiz) {

        return <div > { <Spinner
            role="status"
            animation="border"
            variant="secondary"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              height: "100px",
              width: "100px",
            }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>}</div>
    }

    
    // let len = quiz.length
    // setQuizLength(len)

    return (
        <div>
            <div style={{ marginBottom: 50, textAlign: "center" }}>
                <h1 style={{ borderBottom: "2px solid" }}>Html Quiz</h1>
            </div>
            
            <div style={{ width: "70%", margin: "auto", backgroundColor: "black", padding: 20 }}>
                <div style={{ color: "white" }}>
                    {timer.min < 10 ? "0" + timer.min : timer.min}:
    {timer.sec < 10 ? "0" + timer.sec : timer.sec}
                </div>
                <div style={{ color: "white", textAlign: "center" }}>

                    <h2 > Q{currentQuestion + 1} : {quiz[currentQuestion].question} </h2>

                </div>
                <button onClick={() => { chooseOption(quiz[currentQuestion].option1); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }}> A )    {quiz[currentQuestion].option1} </h3> </button> <br />
                <button onClick={() => { chooseOption(quiz[currentQuestion].option2); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > B )   {quiz[currentQuestion].option2} </h3> </button> <br />
                <button onClick={() => { chooseOption(quiz[currentQuestion].option3); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > C )   {quiz[currentQuestion].option3} </h3> </button> <br />
                <button onClick={() => { chooseOption(quiz[currentQuestion].option4); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > D )   {quiz[currentQuestion].option4} </h3> </button> <br />

                <div style={{ textAlign: "center" }}>


                    {currentQuestion == quiz.length - 1 ? (
                        <>
                            <button onClick={finishQuiz} id="nextQuestion" style={{ width: "60%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                Finish Quiz
                        </button>
                            {/* <button onClick={PreQuestion} id="nextQuestion" style={{ width: "40%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                Previous
                     </button> */}
                        </>
                    ) : (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                {/* <button onClick={PreQuestion} id="nextQuestion" style={{ width: "33%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                    Previous
                        </button> */}
                                <button onClick={nextQuestion} id="nextQuestion" style={{ width: "45%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                    Next Question
                        </button>
                                
                            </div>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
                        {quiz.map((v, i) => {
                            return (
                                <div key={i}>
                                    {currentQuestion == i ? <h1 style={{ backgroundColor: '#1aff1a', width: 50, borderRadius: "50%" }}>{i + 1}</h1> : <h1 style={{ backgroundColor: 'white', width: 50, borderRadius: "50%" }}>{i + 1}</h1>}

                                    {/* <p style={{color:"white"}}>{currentQuestion.length}</p> */}
                                </div>

                            )
                            { console.log(currentQuestion + 1) }
                        })}
                    </div>
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
