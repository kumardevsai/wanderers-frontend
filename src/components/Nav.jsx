import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';
import { NavWrapper, Navigation, List, NavLink } from '../elements/nav';

@inject('WanderersStore')
@observer
export default class Nav extends Component {
  render() {
    const { WanderersStore } = this.props;
    const user = WanderersStore.user;

    return (
      <NavWrapper>
        <Navigation>
          {user ? (
            <List>
              <li>
                <NavLink to="/">HOME</NavLink>
              </li>
              <li>
                <NavLink to="/trips/new">PLAN TRIP</NavLink>
              </li>
              <li>
                <NavLink to="/trips">MY TRIPS</NavLink>
              </li>
              <li>
                <NavLink to="/places">MAP</NavLink>
              </li>
              <li>
                <NavLink to="/logout">LOG OUT</NavLink>
              </li>
            </List>
          ) : (
            <List>
              <li>
                <NavLink to="/">HOME</NavLink>
              </li>
              <li>
                <NavLink to="/signup">SIGN UP</NavLink>
              </li>
              <li>
                <NavLink to="/login">LOGIN</NavLink>
              </li>
            </List>
          )}
        </Navigation>
      </NavWrapper>
    );
  }
}
