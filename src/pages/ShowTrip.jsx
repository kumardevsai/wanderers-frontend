import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { observer, inject } from 'mobx-react';

import MapGL from '../components/MapGL';
import SearchMap from '../components/SearchMap';

@inject('WanderersStore')
@observer
export default class ShowTrip extends Component {
  render() {
    const { WanderersStore } = this.props;
    const trip = WanderersStore.trip;

    if (!trip) {
      return 'Loading';
    }

    return (
      <div>
        <h2>{trip.name}</h2>
        <SearchMap />
        <MapGL />
      </div>
    );
  }
}
