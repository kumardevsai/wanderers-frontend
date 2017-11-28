import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { NavStyle, NavLink } from '../elements/nav';

@inject('WanderersStore')
@observer
export default class Nav extends Component {
  render() {
    const { WanderersStore } = this.props;
    const user = WanderersStore.user;

    return (
      <NavStyle>
        <div>
          <NavLink to="/">HOME</NavLink>
        </div>
        {user ? (
          <ul>
            <li>
              <NavLink to="/profile">PROFILE</NavLink>
            </li>
            <li>
              <NavLink to="/places">MAP SEARCH</NavLink>
            </li>
            <li>
              <NavLink to="/trips/new">PLAN TRIP</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/signup">SIGN UP</NavLink>
            </li>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
            <li>
              <NavLink to="/">FACEBOOK</NavLink>
            </li>
          </ul>
        )}
      </NavStyle>
    );
  }
}
