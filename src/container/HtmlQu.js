import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import firebase from "../config/Firebase"
import { HTMLQUIZ } from "../store/Action/Action"


function HtmlQu(props) {
    const history = useHistory();
    const [quiz, setquiz] = (props.HtmlCss)
    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [Loading, setloading] = useState(true)
    const [optionChosen, setOptionChosen] = useState("");
    let [score, setScore] = useState(0);
    const [language, setlanguage] = useState("HtmlCss");

    const [timer, setTimer] = useState({
        min: 4,
        sec: 59,
    });




    useEffect(() => {
        click()
    }, [])



    const Result = {
        score,
        language,

        
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
                console.log(quiz[currentQuestion].question)
                console.log(quiz[currentQuestion].answer)
                console.log(optionChosen)
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

                firebase.database().ref(`UserData1/Uid/${language}`).child("Wrong Answer").push(data)

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
            firebase.database().ref(`UserData1/Uid/${language}/`).push({ score })
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

            firebase.database().ref(`UserData1/Uid/${language}/`).push({ score })
            firebase.database().ref(`UserData1/Uid/${language}`).child("Wrong Answer").push(data)
            alert(score)
            localStorage.setItem("results", JSON.stringify(Result))
            // console.log("chl rhaa")
            history.replace('/Results')
        }
    };

    const length = (e) => {
        console.log(e)


    }

    if (!quiz) {
        return <div><h1>loading</h1></div>
    }
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
                                <button onClick={Submit} id="nextQuestion" style={{ width: "45%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                    Submit
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
