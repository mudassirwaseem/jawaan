import React from 'react'
import Quiz from "../container/Quiz"
import Javascript from "../container/Javascript"
import Python from "../container/Python"
import Html from "../container/Html"
import JavascriptQu from "../container/JavascriptQu"
import Results from "../container/Results"
import PythonQu from "../container/PythonQu"
import HtmlQu from "../container/HtmlQu"
import Counter from "../container/Counter"


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Navigation() {
    return (
        <Router>
        <Switch>
          <Route exact path='/' component={Quiz} />
          
          <Route exact path='/Javascript' component={Javascript}/>
          <Route exact path='/Python' component={Python}/>
          <Route exact path='/Html' component={Html}/>
          <Route exact path='/JavascriptQu' component={JavascriptQu}/>
          <Route exact path='/Results' component={Results}/>
          <Route exact path='/PythonQu' component={PythonQu}/>
          <Route exact path='/HtmlQu' component={HtmlQu}/>
          <Route exact path='/Counter' component={Counter}/>
          {/* <Route exact path='/' component={SetData} />
          <Route exact path='/data' component={Select} /> */}

        </Switch>
       
      </Router>
    )
}

export default Navigation
