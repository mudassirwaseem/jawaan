import React from 'react'
import Quiz from "../container/Quiz"
import Results from "../container/Results"
import Admin from "../container/Admin"
import Cs from "../container/Cs"
import Main from "../container/Main"
import Files from "../container/Files"
import Admin2 from "../container/Admin2"
import Cs2 from "../container/Cs2"
import Quiz2 from "../container/Quiz2"
import Main2 from "../container/Main2"
import Counter from "../container/Counter"
import MyQuizes from "../container/MyQuizes"

import Foam from "../container/Foam"
import Login2 from "../container/Login2"
import Final from "../container/Finalresults"
import Results2 from "../container/Results2"
import Button from "../container/Button"
import Attendence from "../container/Attendence"
import maincontainer from "../container/maincontainer"
import Dashboard from "../container/Dashboard"

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
          <Route exact path='/Files' component={Files}/>
          <Route exact path='/Results' component={Results}/>
          <Route exact path='/Counter' component={Counter}/>
          <Route exact path='/Admin2' component={Admin2}/>
          <Route exact path='/Admin' component={Admin}/>
          <Route exact path='/Cs'  component={Cs}/>
          <Route exact path='/Main' component={Main}/>
          <Route exact path='/Cs2' component={Cs2}/>
          <Route exact path='/Quiz2' component={Quiz2}/>
          <Route exact path='/Main2' component={Main2}/>
          <Route exact path='/Login2' component={Login2}/>
          <Route exact path='/Foam' component={Foam}/>
          <Route exact path='/MyQuizes' component={MyQuizes}/>
          <Route exact path='/Button' component={Button}/>
          <Route exact path='/Final' component={Final}/>
          <Route exact path='/Results2' component={Results2}/>
          <Route exact path='/Attendence' component={Attendence}/>
          <Route exact path='/maincontainer' component={maincontainer}/>
          <Route exact path='/Dashboard' component={Dashboard}/>
          {/* <Route exact path='/' component={SetData} />
          <Route exact path='/data' component={Select} /> */}
      


        </Switch>
       
      </Router>
    )
}

export default Navigation
