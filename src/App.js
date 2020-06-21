
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './css/main.css'
import CheckIn from './components/CheckIn';
import GetCheckInDate from './components/GetCheckInDate';
import CheckingIn from './components/CheckingIn';

class App extends Component {
  render() {
    return ( 
      <div className="App">
        <div className="mainContainer">
          <BrowserRouter>
            <Switch>
              <Route path='/checkIns' component={GetCheckInDate} />
              <Route path='/:id' component={CheckingIn} />
              <Route path='/' component={CheckIn} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;

