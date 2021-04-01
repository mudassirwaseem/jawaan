import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Cs(props) {

    const history = useHistory();
    const [data1, setdata1] = useState([])
    const [loading, setloading] = useState(true)
    const [language, setlanguage] = useState(props.location.name);
    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const [Username, setUsername] = useState("");
    const [UserId, setUserId] = useState("");


    let [score, setScore] = useState(0);
    let [score1, setScore1] = useState(0);
    const [timer, setTimer] = useState({
        min: 40,
        sec: 59,
    });

    let length = data1.length
    

    // console.log(data1[currentQuestion].Answer)

    useEffect(async () => {

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


            } else {
                console.log("error")
            }
        });


        let data = await firebase.database().ref(`All Quiz/Saylani/CCNA/${language}/Questions`)
        data.on("value", datasnap => {
            console.log(datasnap.val())
            setdata1(Object.values(datasnap.val()))
            setloading(false)
        })


        click()

    }, [])

    // console.log(data1[0].Options[0])

    const Result = {
        score1,
        language,
        Username,
        length
    }

    if (timer.min === 0 && timer.sec === 0) {
        localStorage.setItem("results", JSON.stringify(Result))
        history.replace("/Results", Result)
    }

    const click = () => {
        setInterval(() => {
            setTimer((state) => {
                return {
                    min: state.sec == 0 ? state.min - 1 : state.min,
                    sec: state.sec == 0 ? 59 : state.sec - 1,
                };
            });

        }, 1000);
    };
    const nextQuestion = () => {
        if (optionChosen !== "") {
            if (data1[currentQuestion].answer == optionChosen) {
                console.log(data1[currentQuestion].question)
                console.log(data1[currentQuestion].answer)
                console.log(optionChosen)
                setScore(++score);

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("")
            } else if (data1[currentQuestion].answer !== optionChosen) {

                let data = {
                    Question: data1[currentQuestion].question,
                    CrAnswer: data1[currentQuestion].answer,
                    AnsChoosen: optionChosen
                }

                console.log(data)

                // firebase.database().ref(`UserData1/UserId/${language}`).child("Wrong Answer").push(data)
                firebase.database().ref(`Students/${UserId}/${language}`).child("Wrong Answer").push(data)

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("");
            }
        } else {
            alert("choose the option")
        }
    };

    const nextQuestion1 = () => {
        if (optionChosen !== "") {
            if (data1[currentQuestion].Answer == optionChosen) {
                console.log(data1[currentQuestion].Question)
                console.log(data1[currentQuestion].Answer)
                console.log(optionChosen)
                setScore1(++score1);
                alert(score1)
                console.log("right")

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("")
            } else if (data1[currentQuestion].Answer !== optionChosen) {

                let data = {
                    Question: data1[currentQuestion].Question,
                    CrAnswer: data1[currentQuestion].Answer,
                    AnsChoosen: optionChosen
                }
                console.log("wrong")

                console.log(data)

                // firebase.database().ref(`UserData1/UserId/${language}`).child("Wrong Answer").push(data)
                firebase.database().ref(`Students/${UserId}/${language}`).child("Wrong Answer").push(data)

                setCurrentQuestion(currentQuestion + 1);
                setOptionChosen("");
            }
        } else {
            alert("choose the option")
        }
    };

    const chooseOption = (option) => {
        setOptionChosen(option);
        console.log(option)
    };

    // const nextQuestion1 = ()=>{
    //     console.log(data1[currentQuestion].Answer)
    //     console.log(optionChosen)
    //     if (data1[currentQuestion].Answer == optionChosen)
    //     setCurrentQuestion(currentQuestion + 1)
    //     alert("Scoore")
    // }



    const finishQuiz = () => {
        if (optionChosen !== "") {


            if (data1[currentQuestion].Answer == optionChosen) {
                setScore(++score1);
                firebase.database().ref(`Students/${UserId}/${language}/Score`).set({ score })
                alert(score1)
                localStorage.setItem("results", JSON.stringify(Result))
                history.replace('/Results2')
            } else if (data1[currentQuestion].Answer !== optionChosen) {
                setScore(score1);

                let data = {
                    Question: data1[currentQuestion].question,
                    CrAnswer: data1[currentQuestion].Answer,
                    AnsChoosen: optionChosen
                } 

                firebase.database().ref(`Students/${UserId}/${language}/Score`).set({ score1 })
                firebase.database().ref(`Students/${UserId}/${language}`).child("Wrong Answer").push(data)

                alert(score)
                localStorage.setItem("results", JSON.stringify(Result))
                // console.log("chl rhaa")
                history.replace('/Results2')
            }
        } else {
            alert("choose the option")
        }
    };


    // const chooseOption = (option) => {
    //     setOptionChosen(option);
    //     console.log(option)
    // };

    

    if (loading) {
        return <div>
            <h1>Loading</h1>
        </div>
    }

    return (
        <div style={{ width: "60%", margin: "auto" }} >
            <div style={{ color: "black" }}>
                {timer.min < 10 ? "0" + timer.min : timer.min}:
    {timer.sec < 10 ? "0" + timer.sec : timer.sec}
            </div>

            <div style={{ marginBottom: 50, textAlign: "center" }}>
                <h1 style={{ borderBottom: "2px solid" }}>{language} QUIZ </h1>
            </div>
            <h2 > Q{currentQuestion + 1} : {data1[currentQuestion].Question} </h2>
            <div>

                {data1[currentQuestion].Options.map((Option, i) => {
                    return <div>

                        <button style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }} onClick={() => {chooseOption(Option)}}>  {Option}</button> <br />

                    </div>


                })}
 {currentQuestion == data1.length - 1 ? (
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

                            <button onClick={nextQuestion1} id="nextQuestion" style={{ width: "45%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                Next Question
    </button>

                        </div>
                    </div>
                )}
            </div>

            {/* <button onClick={() => { chooseOption(data1[currentQuestion].option1); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }}> A )    {data1[currentQuestion].option1} </h3> </button> <br />
            <button onClick={() => { chooseOption(data1[currentQuestion].option2); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > B )   {data1[currentQuestion].option2} </h3> </button> <br />
            <button onClick={() => { chooseOption(data1[currentQuestion].option3); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > C )   {data1[currentQuestion].option3} </h3> </button> <br />
            <button onClick={() => { chooseOption(data1[currentQuestion].option4); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > D )   {data1[currentQuestion].option4} </h3> </button> <br /> */}

            <div style={{ textAlign: "center" }}>


                {currentQuestion == data1.length - 1 ? (
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

                            <button onClick={nextQuestion} id="nextQuestion" style={{ width: "45%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                                Next Question
    </button>

                        </div>
                    </div>
                )}


                {currentQuestion + 1} OF {length} Question
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
                    {data1.map((v, i) => {
                        return (
                            <div key={i}>

                                {currentQuestion == i ? <h1 style={{ backgroundColor: '#1aff1a', width: 50, borderRadius: "50%" }}>{i + 1}</h1> : <h1 style={{ backgroundColor: 'white', width: 50, borderRadius: "50%" }}>{i + 1}</h1>}

                            </div>

                        )
                    })}
                </div>
            </div>



            {/* 
            <h2>{data1[currentQuestion].question} ?</h2>
            <h3>{data1[currentQuestion].option1}</h3>
            <h3>{data1[currentQuestion].option2}</h3>
            <h3>{data1[currentQuestion].option3}</h3>
            <h3>{data1[currentQuestion].option4}</h3>

            <button onClick={Next}> Next</button> */}


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
