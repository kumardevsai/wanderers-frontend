import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Redirect } from 'react-router-dom';

@inject('WanderersStore', 'UiStore')
@observer
export default class JoinTrip extends Component {
  componentWillMount() {
    if (this.props.WanderersStore.user) {
      // post to buddies create to create buddy record for user for trip
      const tripId = this.props.match.params.id;
      this.props.WanderersStore.joinTrip(tripId, this.props.history);
    } else {
      // save in session storage where user wanted to go
      sessionStorage.setItem('url-after-login', this.props.location.pathname);
    }
  }

  render() {
    if (this.props.WanderersStore.user) {
      return 'Joining trip 🛵';
    } else {
      return <Redirect to="/signup" />;
    }
  }
}
