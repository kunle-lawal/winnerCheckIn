
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './css/main.css'
import CheckIn from './components/CheckIn';
import GetCheckInDate from './components/GetCheckInDate';
import CheckingIn from './components/CheckingIn';
import GetFullData from './components/GetFullData';

class App extends Component {
  render() {
    return ( 
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/checkIns' component={GetCheckInDate} />
            <Route path='/data/:id' component={GetFullData} />
            <Route path='/:id' component={CheckingIn} />
            <Route path='/' component={CheckIn} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

