import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User/User';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar title="Contact List" />
          <Switch>
            <Route exact path='/' component={User}/>
            <Route path='/contacts' component={Home}/>
          </Switch>
          <NavBar title="" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
