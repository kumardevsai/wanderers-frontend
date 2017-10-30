import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MapGL from '../components/MapGL';

@inject('WanderersStore')
@observer
export default class Places extends Component {
  render() {
    return <MapGL />;
  }
}
