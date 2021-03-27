import React, { useState, useEffect } from 'react'
import { connect, useStore } from "react-redux"
import { HTMLQUIZ } from "../store/Action/Action"

import {
    Link
} from "react-router-dom";

function Html(props) {
    
    return (
        <div className="App">
            <h1>HTML & CSS</h1>
            <Link to="/HtmlQu" > <button onClick={() => props.HTMLQUIZ()} >START QUIZ</button></Link> <br />
        </div>
    )
}

const mapstatetoprops = (state) => ({
    HtmlCss: state.HtmlCss
})

const mapdispatchtoprops = (dispatch) => ({
    HTMLQUIZ: () => dispatch(HTMLQUIZ()),
})

export default connect(mapstatetoprops, mapdispatchtoprops)(Html)