import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import MapGL from '../components/MapGL';
import BuddyForm from '../components/BuddyForm';
import SearchMap from '../components/SearchMap';
import Chat from '../components/Chat';

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
        {/* <SearchMap /> */}
        <BuddyForm />
        <Chat />
        <MapGL />
      </div>
    );
  }
}
