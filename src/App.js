import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
