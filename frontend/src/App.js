import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User/User';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={User}/>
            <Route path='/contacts' component={Home}/>
            <Route path='*' component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
