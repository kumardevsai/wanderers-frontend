import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import WanderersStore from './stores/WanderersStore';
import UiStore from './stores/UiStore';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Places from './pages/Places';
import NewTrip from './pages/NewTrip';
import ShowTrip from './pages/ShowTrip';
import Profile from './pages/Profile';

// import './App.css';
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
                <Route exact path="/" component={Login} />
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
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
