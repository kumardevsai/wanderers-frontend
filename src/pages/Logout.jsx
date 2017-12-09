import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Redirect } from 'react-router-dom';

@inject('WanderersStore', 'UiStore')
@observer
export default class Logout extends Component {
  componentWillMount() {
    this.props.WanderersStore.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}
