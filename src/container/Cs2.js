// import React, { useEffect, useState } from 'react'
// import firebase from "../config/Firebase"
// import { useHistory } from 'react-router-dom'


// function Cs(props) {

//     const history = useHistory();
//     const [data1, setdata1] = useState([])
//     const [loading, setloading] = useState(true)
//     const [language] = useState(props.location.name);
//     let [currentQuestion, setCurrentQuestion] = useState(0);
//     const [optionChosen, setOptionChosen] = useState("");
//     const [Username, setUsername] = useState("");
//     const [UserId, setUserId] = useState("");
//     const [Course, setCourse] = useState("");
//     const [Insitute, setInsitute] = useState("")

//     let [score, setScore] = useState(0);
//     const [timer, setTimer] = useState({
//         min: 4,
//         sec: 59,
//     });
//     let length = data1.length

//     useEffect(async () => {

//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {


//                 var uid = user.uid;
//                 var user = user.displayName
//                 setUserId(uid)
//                 setUsername(user)
//                 // console.log(uid)
//                 console.log(user)

//                 firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
//                     .on("value", datasnap => {
//                         console.log(datasnap.val())
//                         setInsitute(datasnap.val())
//                         let insitute = datasnap.val()

//                         firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/course`)
//                             .on("value", datasnap => {
//                                 // console.log(datasnap.val())
//                                 setCourse(datasnap.val())
//                                 let course = (datasnap.val())
//                                 console.log(datasnap.val())


//                                 // setPicture(datasnap.val())
//                                 firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${language}/Questions`)
//                                     .on("value", datasnap => {


//                                         setdata1(Object.values(datasnap.val()))
//                                         console.log("Quiz data", Object.values(datasnap.val()))



//                                         setloading(false)
//                                     })
//                             })
//                     })

//             } else {
//                 console.log("error")
//             }
//         });



//         click()

//     }, [])
//     const Result = {
//         score,
//         language,
//         Username,
//         length,
//         UserId
//     }

//     if (timer.min === 0 && timer.sec === 0) {
//         localStorage.setItem("results", JSON.stringify(Result))
//         history.replace("/Results", Result)
//     }


//     const click = () => {
//         setInterval(() => {
//             setTimer((state, props) => {
//                 return {
//                     min: state.sec == 0 ? state.min - 1 : state.min,
//                     sec: state.sec == 0 ? 59 : state.sec - 1,
//                 };
//             });

//         }, 1000);
//     };
//     const nextQuestion = () => {
//         if (optionChosen !== "") {
//             if (data1[currentQuestion].answer == optionChosen) {
//                 console.log(data1[currentQuestion].question)
//                 console.log(data1[currentQuestion].answer)
//                 console.log(optionChosen)
//                 setScore(++score);

//                 setCurrentQuestion(currentQuestion + 1);
//                 setOptionChosen("")
//             } else if (data1[currentQuestion].answer !== optionChosen) {


//                 let data = {
//                     Question: data1[currentQuestion].question,
//                     CrAnswer: data1[currentQuestion].answer,
//                     AnsChoosen: optionChosen
//                 }

//                 console.log(data)

//                 // firebase.database().ref(`UserData1/UserId/${language}`).child("Wrong Answer").push(data)
//                 firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Wrong Answer`).push(data)

//                 setCurrentQuestion(currentQuestion + 1);
//                 setOptionChosen("");
//             }
//         } else {
//             alert("choose the option")//tumhari array kdr h?
//         }
//     };



//     const finishQuiz = () => {
//         if (optionChosen !== "") {


//             if (data1[currentQuestion].answer == optionChosen) {
//                 setScore(++score);
//                 firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
//                 alert(score)
//                 localStorage.setItem("results", JSON.stringify(Result))
//                 // console.log("chl rhaa")
//                 history.replace('/Results')
//             } else if (data1[currentQuestion].answer !== optionChosen) {
//                 setScore(score);

//                 let data = {
//                     Question: data1[currentQuestion].question,
//                     CrAnswer: data1[currentQuestion].answer,
//                     AnsChoosen: optionChosen
//                 }

//                 firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
//                 firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Wrong Answer`).push(data)

//                 alert(score)
//                 localStorage.setItem("results", JSON.stringify(Result))
//                 // console.log("chl rhaa")
//                 history.replace('/Results')
//             }
//         } else {
//             alert("choose the option")
//         }
//     };


//     const chooseOption = (option) => {
//         setOptionChosen(option);
//     };
//     if (loading) {
//         return <div>
//             <h1>Loading</h1>
//         </div>
//     }

//     return (
//         <div style={{ width: "60%", margin: "auto" }} >
//             <div style={{ color: "black" }}>
//                 {timer.min < 10 ? "0" + timer.min : timer.min}:
//     {timer.sec < 10 ? "0" + timer.sec : timer.sec}
//             </div>
//             <div style={{ marginBottom: 50, textAlign: "center" }}>
//                 <h1 style={{ borderBottom: "2px solid" }}>{language} QUIZ </h1>
//             </div>
//             <h2 > Q{currentQuestion + 1} : {data1[currentQuestion].question} </h2>
//             <button onClick={() => { chooseOption(data1[currentQuestion].option1); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }}> A )    {data1[currentQuestion].option1} </h3> </button> <br />
//             <button onClick={() => { chooseOption(data1[currentQuestion].option2); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > B )   {data1[currentQuestion].option2} </h3> </button> <br />
//             <button onClick={() => { chooseOption(data1[currentQuestion].option3); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > C )   {data1[currentQuestion].option3} </h3> </button> <br />
//             <button onClick={() => { chooseOption(data1[currentQuestion].option4); }} style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }}>  <h3 style={{ width: '100%' }} > D )   {data1[currentQuestion].option4} </h3> </button> <br />

//             <div style={{ textAlign: "center" }}>


//                 {currentQuestion == data1.length - 1 ? (
//                     <>
//                         <button onClick={finishQuiz} id="nextQuestion" style={{ width: "60%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
//                             Finish Quiz
//     </button>
//                         {/* <button onClick={PreQuestion} id="nextQuestion" style={{ width: "40%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
//             Previous
//  </button> */}
//                     </>
//                 ) : (
//                     <div>
//                         <div style={{ display: "flex", justifyContent: "space-around" }}>

//                             <button onClick={nextQuestion} id="nextQuestion" style={{ width: "45%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
//                                 Next Question
//     </button>

//                         </div>
//                     </div>
//                 )}

//                 {currentQuestion + 1} OF {length} Question
//                 <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
//                     {data1.map((v, i) => {
//                         return (
//                             <div key={i}>

//                                 {currentQuestion == i ? <h1 style={{ backgroundColor: '#1aff1a', width: 50, borderRadius: "50%" }}>{i + 1}</h1> : <h1 style={{ backgroundColor: 'white', width: 50, borderRadius: "50%" }}>{i + 1}</h1>}

//                             </div>

//                         )
//                         { console.log(currentQuestion + 1) }
//                     })}
//                 </div>
//             </div>


//             {/* 
//             <h2>{data1[currentQuestion].question} ?</h2>
//             <h3>{data1[currentQuestion].option1}</h3>
//             <h3>{data1[currentQuestion].option2}</h3>
//             <h3>{data1[currentQuestion].option3}</h3>
//             <h3>{data1[currentQuestion].option4}</h3>

//             <button onClick={Next}> Next</button> */}


//             {/* {data1.map((v,i)=>{
//            return( <div>
//                <h1>{v.}</h1>
//            </div>

//            )
//             })} */}

//         </div>
//     )
// }

// export default Cs


import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'


function Cs2(props) {

    const history = useHistory();
    const [data1, setdata1] = useState([])
    const [loading, setloading] = useState(true)
    const [language] = useState(props.location.name);
    let [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const [Username, setUsername] = useState("");
    const [UserId, setUserId] = useState("");
    const [Course, setCourse] = useState("");
    const [Insitute, setInsitute] = useState("")
    let [score, setScore] = useState(0);
    const [timer, setTimer] = useState({    
        min: 4,
        sec: 59,
    });


    let length = data1.length
    
    
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      console.log("shufffleee",randomIndex)
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return data1;
  }

  var data = data1;


    
    useEffect(async () => {
        

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                var user = user.displayName
                setUserId(uid)
                setUsername(user)
                // console.log(uid)
                console.log(user)
                
                firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                    .on("value", datasnap => {
                        console.log(datasnap.val())
                        setInsitute(datasnap.val())
                        let insitute = datasnap.val()

                        firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Course`)
                            .on("value", datasnap => {
                                setCourse(datasnap.val())
                                let course = (datasnap.val())
                                console.log(datasnap.val())

                                firebase.database().ref(`Jawaan_Pakistan/${insitute}/${course}/${language}/Questions`)
                                    .on("value", datasnap => { 
                                        //  console.log(Object.values(datasnap.val()))
                                        setdata1(Object.values(datasnap.val()))
                                        //  shuffle( setdata1(Object.values(datasnap.val())))

                                        console.log("Quiz data", Object.values(datasnap.val()))
                     
                                        setloading(false)
                                        
                                    })
                            })
                    })

            } else {
                console.log("error")
            }
        });


        click()


    }, [])

    const Result = {
        score,
        language,
        Username,
        length,
        UserId
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
            if (data1[currentQuestion].Answer == optionChosen) {
                console.log(data1[currentQuestion].Question)
                console.log(data1[currentQuestion].Answer)
                console.log(optionChosen)
                setScore(++score);
 
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
                firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Wrong Answer`).push(data)
                setCurrentQuestion(currentQuestion + 1);
                 setOptionChosen("");
            }
        } else {
            alert("choose the option")
        }
    };


    



    const finishQuiz = () => {
        if (optionChosen !== "") {
            if (data1[currentQuestion].Answer == optionChosen) {
                setScore(++score);
                 firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
                 localStorage.setItem("results", JSON.stringify(Result))
                history.replace('/Results')

            } 
            else if (data1[currentQuestion].Answer !== optionChosen) {
                setScore(score);
                
                let data = {
                    Question: data1[currentQuestion].Question,
                    CrAnswer: data1[currentQuestion].Answer,
                    AnsChoosen: optionChosen
                } 

                firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
                firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Wrong Answer`).push(data)

                localStorage.setItem("results", JSON.stringify(Result))
                // console.log("chl rhaa")
                history.replace('/Results')
            }
        } else {
            alert("choose the option")
        }
    };
    // const finishQuiz = () => {
    //     if (optionChosen !== "") {


    //         if (data1[currentQuestion].answer == optionChosen) {
    //             setScore(++score);
    //             firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
    //             alert(score)
    //             localStorage.setItem("results", JSON.stringify(Result))
    //             // console.log("chl rhaa")
    //             history.replace('/Results')
    //         } else if (data1[currentQuestion].answer !== optionChosen) {
    //             setScore(score);

    //             let data = {
    //                 Question: data1[currentQuestion].question,
    //                 CrAnswer: data1[currentQuestion].answer,
    //                 AnsChoosen: optionChosen
    //             }

    //             firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Score`).set({ score })
    //             firebase.database().ref(`Jawaan_Pakistan/Users/${UserId}/AllData/${Insitute}/${Course}/${language}/Wrong Answer`).push(data)

    //             alert(score)
    //             localStorage.setItem("results", JSON.stringify(Result))
    //             // console.log("chl rhaa")
    //             history.replace('/Results')
    //         }
    //     } else {
    //         alert("choose the option")
    //     }
    // };


    const chooseOption = (option) => {
        setOptionChosen(option);
    };
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

             {data1[currentQuestion].Options.map((Option, index) => {
                return <div key={index}>

                    <button className="aoo" style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: 10, color: "white" }} onClick={() => { chooseOption(Option) }}>  {Option}</button> <br />

                </div>


            })}

            {currentQuestion == data1.length - 1 ? (
                <>
                    <button onClick={finishQuiz} id="nextQuestion" style={{ width: "60%", backgroundColor: "white", height: 40, borderRadius: 20, marginTop: 30, textAlign: "center" }}>
                        Finish Quiz
                     </button>

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
            <div style={{ textAlign: "center" }}>


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

export default Cs2


