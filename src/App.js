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
import Profile from './pages/Profile';

import './scss/main.scss';

class App extends Component {
  render() {
    return (
      <Provider WanderersStore={WanderersStore} UiStore={UiStore}>
        <div className="App">
          <BrowserRouter>
            <div>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/places" component={Places} />
                <Route exact path="/trips/new" component={NewTrip} />
                {/* This type of routing is used when you need to load data before rendering the component for this path -type before action in rails - */}
                <Route
                  exact
                  path="/trips/:id"
                  render={props => {
                    const tripId = props.match.params.id;
                    WanderersStore.loadTrip(tripId);
                    return <ShowTrip />;
                  }}
                />
                <Route
                  exact
                  path="/profile"
                  render={() => {
                    WanderersStore.loadTrips();
                    return <Profile />;
                  }}
                />
                <Route
                  exact
                  path="/trips/:id/join"
                  render={props => {
                    if (WanderersStore.user) {
                      // post to buddies create to crete buddy record for user for trip
                      const tripId = props.match.params.id;
                      WanderersStore.joinTrip(tripId, props.history);
                      return 'Joining trip 🛵';
                    } else {
                      // save in session storage where user wanted to go
                      sessionStorage.setItem(
                        'url-after-login',
                        props.location.pathname
                      );
                      // redirect to signup
                      return <Redirect to="/signup" />;
                    }
                  }}
                />
                <Route
                  exact
                  path="/logout"
                  render={() => {
                    WanderersStore.logout();
                    return <Redirect to="/" />;
                  }}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
