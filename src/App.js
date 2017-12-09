import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';

import WanderersStore from './stores/WanderersStore';
import UiStore from './stores/UiStore';
import Home from './pages/Home';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Places from './pages/Places';
import NewTrip from './pages/NewTrip';
import ShowTrip from './pages/ShowTrip';
import TripsListing from './pages/TripsListing';
import JoinTrip from './pages/JoinTrip';
import Logout from './pages/Logout';

import { AppContainer } from './elements/app';

import './scss/main.scss';

class App extends Component {
  render() {
    return (
      <Provider WanderersStore={WanderersStore} UiStore={UiStore}>
        <AppContainer>
          <BrowserRouter>
            <div>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/places" component={Places} />
                <Route exact path="/trips/new" component={NewTrip} />
                <Route exact path="/trips/:id" component={ShowTrip} />
                <Route exact path="/trips" component={TripsListing} />
                <Route exact path="/trips/:id/join" component={JoinTrip} />
                <Route exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </BrowserRouter>
        </AppContainer>
      </Provider>
    );
  }
}

export default App;
