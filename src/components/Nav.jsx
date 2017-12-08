import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';
import {
  NavWrapper,
  Navigation,
  List,
  ListItem,
  NavLink
} from '../elements/nav';

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
              <ListItem>
                <NavLink to="/">HOME</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/trips/new">PLAN TRIP</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/trips">MY TRIPS</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/places">MAP</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/logout">LOG OUT</NavLink>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem>
                <NavLink to="/">HOME</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/signup">SIGN UP</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/login">LOGIN</NavLink>
              </ListItem>
            </List>
          )}
        </Navigation>
      </NavWrapper>
    );
  }
}
