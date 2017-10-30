import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import WanderersStore from './stores/WanderersStore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Places from './pages/Places';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider WanderersStore={WanderersStore}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/places" component={Places} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
