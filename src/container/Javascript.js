import React,{useState,useEffect} from 'react'
import {connect} from "react-redux"
import {JAVASCRIPT} from "../store/Action/Action"
import {
    Link
  } from "react-router-dom";


function Javascript(props) {
let [currentQuestion, setCurrentQuestion] = useState(0);

   
    



    return (
        <div className="App">
            <h1>Javascript</h1>
<Link to="/JavascriptQu" > <button onClick={()=>props.JAVASCRIPT()} >START QUIZ</button></Link>




        </div>
    )
}

const mapstatetoprops =(state)=>({
    Javascript : state.Javascript
    })

const mapdispatchtoprops =(dispatch)=>({
    JAVASCRIPT : ()=> dispatch(JAVASCRIPT()),
    })
export default connect(mapstatetoprops,mapdispatchtoprops) (Javascript)