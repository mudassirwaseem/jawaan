import React, { useState, useEffect } from 'react'
import firebase from "../config/Firebase"
import { useHistory } from 'react-router-dom'

function Attendence() {
    const history = useHistory();

    const [Course, setCourse] = useState("");
    const [institute, setInstitute] = useState("");
    const [button, setbutton] = useState(false);
    const [name, setName] = useState("");
    const [attendence, setattendence] = useState("");
    const [loading, setloading] = useState(true);
    const [Uid, setuid] = useState("");



    console.log(button)
 
    let a = new Date().getDay();
    var uid;

    useEffect(async () => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                uid = user.uid;
                var user = user.displayName;
                 setuid(user.uid);
                console.log(uid);

                setName(user)
                console.log(user)



                let data3 = firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Insitute`)
                data3.on("value", datasnap => {
                    console.log(datasnap.val())
                    let Institite = datasnap.val()
                    setInstitute(datasnap.val())


                    firebase.database().ref(`Jawaan_Pakistan/Users/${uid}/AllData/Profile/OtherDetail/Course`)
                        .on("value", datasnap => {
                            console.log(datasnap.val())
                            setCourse(datasnap.val())
                            let Course  = datasnap.val()


                            firebase.database().ref(`Attendense/${Institite}/${Course}/shedule`)
                                .on("value", datasnap => {
                                    // console.log(datasnap.val())
                                    console.log("dataaaaa", datasnap.val())
                                    setattendence(datasnap.val())
                                    setloading(false)
                                })
                        })
                })


            } else {
                console.log("error")
            }
        });


    }, [])


    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date().toLocaleDateString()
    let day = days[a]

    const Submit = () => {
        let data = { name, date }
        console.log(data)
        console.log(uid)
        firebase.database().ref(`Users/attendence/${institute}/${Course}/${Uid}/`).set(data)
        alert("attendence submited")
        history.replace("Dashboard")
    }

    return (
        <div>
            <div>
                <div className="main1">
                    <h2 style={{ color: '#006633' }}>{Course}</h2>
                    <h2 style={{ color: '#006633' }}>{institute}</h2>
                </div>
                <div className="main">
                    <div className="main2">
                        <h1 style={{ backgroundColor: '#006633', color: 'white', padding: '10px', margin: 0 }}>Attendence</h1>
                    </div>
                    { attendence === "ON"  ? (<>
                    <h2 style={{ color: 'gray' }}>Mark Your Attendence here</h2>
                    
                        <div>                  
                        <div style={{ margin: '20px auto', width: '80%', border: '1px solid' }}>
                          <div className="table1">
                              <h4>Section</h4>
                              <h4>Date</h4>
                              <h4>Timing</h4>
                              <h4>Day</h4>
                              <h4>Attendence</h4>
                          </div>
                          <div className="table2">
                              <h4>{institute}</h4>
                              <h4>{date}</h4>
                              <h4>6.30-8.30</h4>
                              <h4>{day}</h4>
                              {attendence === "ON" ? (
                                  <label className="switch">
                                      <input type="checkbox" id="switch" />
                                      <label htmlFor="switch" className="slider round" onClick={() => setbutton(!button)}></label>
                                  </label>
                              ) : (
                                  <p>chl nkl</p>
                              )}
  
                          </div>
  
                      </div>
                         { button ? (<div className="divbtn">
                              <button className="btn" onClick={Submit}>Submit</button>
                          </div>) : (<div className="divbtn">
                              <button className="btn" disabled >Submit</button>
                          </div>)}
                  
                      </div></>
                    ) : ( <h1>no more attendence</h1> )}
                    
                </div>
            </div>


        </div>
    )
}

export default Attendence
