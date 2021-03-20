import React,{useState,useEffect} from 'react'
import {connect} from "react-redux"
import {PHYTHON} from "../store/Action/Action"
import {
    Link
  } from "react-router-dom";


function Phython(props) {
let [currentQuestion, setCurrentQuestion] = useState(0);

   
    



    return (
        <div className="App">
            <h1>PHYTHON</h1>
<Link to="/PythonQu" > <button onClick={()=>props.PHYTHON()} >START QUIZ</button></Link>




        </div>
    )
}

const mapstatetoprops =(state)=>({
    Python : state.Python
    })

const mapdispatchtoprops =(dispatch)=>({
    PHYTHON : ()=> dispatch(PHYTHON()),
    })
export default connect(mapstatetoprops,mapdispatchtoprops) (Phython)