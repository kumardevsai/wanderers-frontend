import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { SearchContainer } from '../elements/search';

@inject('WanderersStore')
@observer
export default class Nav extends Component {
  render() {
    const { WanderersStore } = this.props;
    const user = WanderersStore.user;

    return (
      <nav>
        <div className="home-link">
          <Link to="/">HOME</Link>
        </div>
        {user ? (
          <ul>
            <li>
              <Link to="/places">MAP SEARCH</Link>
            </li>
            <li>
              <Link to="/trips/new">PLAN TRIP</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/signup">SIGN UP</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/">FACEBOOK</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}
