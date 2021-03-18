import React from 'react'
import {connect} from "react-redux"
import {Firebase_data} from "../store/Action/Action"

import {
 Link
  } from "react-router-dom";


function Quiz(props) {
    
// console.log(props.Quizs)
    return (
        <div>
            <h1>Quiz</h1>
            <Link to="/Javascript"  > JAVASCRIPT QUIZ</Link> 
            <Link to="/Html">   <button >HTML & CSS QUIZ </button></Link>
            <Link to="/Python"> <button >PYTHON QUIZ </button></Link>
        </div>
    )
}


export default Quiz
