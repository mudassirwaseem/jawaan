import React, { useEffect, useState } from 'react'
import firebase from "../config/Firebase"
import "./App.css";
function Results(props) {

    const [data, setdata] = useState([])
    const [UserId, setUserId] = useState("");
    const [Picture, setPicture] = useState("");
    const [Loading, setloading] = useState(true)
    const [Course, setCourse] = useState("");
    // const [Grade, setGrade] = useState("");
    // console.log(Grade)



    const [customClassName, setCustomClassName] = useState(false);

    const openModal = () => {
        setCustomClassName(true);
    };

    const closeModal = () => {
        setCustomClassName(false);
    };



    const resultsData = JSON.parse(localStorage.getItem("results"))

    const Percentage = Math.floor(resultsData.score / resultsData.length * 100)

    console.log(Percentage)

    let grade;
    if (Percentage >= 90) {
        grade = "A+"
    }
     else if (Percentage >= 80) {
        grade = "A"
    } else if (Percentage >= 70) {
        grade = "B"
    } else if (Percentage >= 60) {
        grade = "C"
    } else {
        grade = "Fail"
    }

    console.log(grade)

    // let val =  Percentage >= 70 ? setGrade("A") : Percentage >= 60 ? setGrade("B") : Percentage >= 50 ? setGrade("C"):Percentage < 50 ? setGrade("Fail") : ""
    // let gradeCal =  Percentage >= 70 ? setGrade("A") : Percentage >= 60 ? setGrade("B") : Percentage >= 50 ? setGrade("C"):Percentage < 50 ? setGrade("Fail") : ""
    let AllData = {

        Name: resultsData.Username,
        CorrectAnswer: resultsData.score,
        QuestionLength: resultsData.length,
        Percentage,
        Grade : grade,
        UId: resultsData.UserId,
        Course: resultsData.language

    }

    console.log(AllData)


    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                //   setUserId(uid)
                console.log(uid)


                let data3 = firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                data3.on("value", datasnap => {
                    console.log(datasnap.val())
                    let Insitute = datasnap.val()


                    firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Course`)
                        .on("value", datasnap => {
                            // console.log(datasnap.val())
                            setCourse(datasnap.val())
                            let course = (datasnap.val())
                            console.log(course)

                            let data = firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/${Insitute}/${course}/${resultsData.language}/Wrong Answer`)
                            data.on("value", datasnap => {
                                console.log(datasnap.val())
                                setdata(Object.values(datasnap.val()))
                                setloading(false)
                                firebase.database().ref(`Jawaan_Pakistan/Results/${Insitute}/${course}/${resultsData.language}/${uid}`).set(AllData)
                                firebase.database().ref(`Jawaan_Pakistan/AllUserResults/${uid}/${Insitute}/${course}/${resultsData.language}`).set(AllData)

                            })
                        })

                })

                let data2 = firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/profile`)
                data2.on("value", datasnap => {
                    console.log(datasnap.val())
                    setPicture(datasnap.val())
                    // setdata(Object.values(datasnap.val()))
                    // setloading(false)
                })
            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

    if (Loading) {
        return <div><h1>loading</h1></div>
    }

    return (
        <div className="App">

            <div style={{ border: "2px solid", width: "60%", textAlign: "center", margin: "auto", marginBottom: 20 }}>
                <img style={{ borderRadius: "50%" }} src={Picture} alt="" />
                <h1>Name : {resultsData.Username}</h1>
                <h1> Course : {resultsData.language}</h1>
                <h1>Score :{resultsData.score}/ {resultsData.length} </h1>
                <h2>Percentage : {Math.floor(resultsData.score / resultsData.length * 100)} %</h2>


                <h2> Grade :{grade}</h2>
            </div>

            {/* modal */}
            <button onClick={openModal}>Open Modal</button>
            <div className={`modal-bg ${customClassName ? "bg-active" : ""}`}>
                <div className="modal">

                    {data.map((v, i) => {
                        return (<div key={i} style={{ width: "60%", margin: "auto", border: "2px solid", padding: 20 }}>
                            <h2>Q - {v.Question}</h2>
                            <div><h4 style={{ backgroundColor: "green", color: "white", display: "flex", justifyContent: "space-around", height: 40, alignItems: "center" }}><span>Correct Answer : </span><span>{v.AnsChoosen}</span></h4></div>
                            <div><h4 style={{ backgroundColor: "red", color: "white", display: "flex", justifyContent: "space-around", height: 40, alignItems: "center" }}><span>You Choosen : </span><span>{v.CrAnswer}</span></h4></div>
                        </div>

                        )
                    })}
                    <span className="modal-close" onClick={() => closeModal()}>
                        X
          </span>
                </div>
            </div>




        </div>
        //     const resultsData = JSON.parse(localStorage.getItem("results"))
        //     return (
        //         <div className="App">
        //              <h1>Result</h1>

        //             <h1> Course : {resultsData.language}</h1> 
        //             <h1>Score 10 / {resultsData.score}</h1>

        //     )
        // }
    )
}
export default Results

