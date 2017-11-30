import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { NavStyle, NavLink, InnerList } from '../elements/nav';

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
          <InnerList>
            <li>
              <NavLink to="/trips">MY TRIPS</NavLink>
            </li>
            <li>
              <NavLink to="/places">MAP</NavLink>
            </li>
            <li>
              <NavLink to="/trips/new">PLAN TRIP</NavLink>
            </li>
            <li>
              <NavLink to="/logout">LOG OUT</NavLink>
            </li>
          </InnerList>
        ) : (
          <InnerList>
            <li>
              <NavLink to="/signup">SIGN UP</NavLink>
            </li>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
            <li>
              <NavLink to="/">
                <img src="/facebook.svg" alt="facebook icon" />
              </NavLink>
            </li>
          </InnerList>
        )}
      </NavStyle>
    );
  }
}
