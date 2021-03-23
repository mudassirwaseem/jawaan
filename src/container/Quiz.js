import React from 'react'
import {connect} from "react-redux"
import {Firebase_data} from "../store/Action/Action"

import {
 Link
  } from "react-router-dom";


function Quiz(props) {

    return (
        <div className="App">
            <h1>Quiz</h1>
            <div style={{marginTop:40}}>    
            <Link to="/Javascript" > <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>JAVASCRIPT QUIZ</button> </Link> <br/>
            <Link to="/Html"  >  <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>HTML & CSS QUIZ</button>  </Link> <br/>
            <Link to="/Python"> <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>PYTHON QUIZ</button>  </Link> <br/>
            <Link to="/Admin"> <button style={{width:200,height:40,margin:10,backgroundColor: "#1a1aff",color:"white"}}>Add Quiz</button>  </Link> <br/>
            </div>
                        
        </div>
    )
}




export default Quiz
