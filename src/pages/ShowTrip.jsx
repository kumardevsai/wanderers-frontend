import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { ChatBuddyList, ChatBuddyListItem } from '../elements/chat';

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
        <h3>{trip.name}</h3>
        <ChatBuddyList>
          {WanderersStore.buddies.map(buddy => (
            <ChatBuddyListItem key={buddy.id}>
              Trip Buddies: {buddy.name}
            </ChatBuddyListItem>
          ))}
        </ChatBuddyList>
        <SearchMap />
        <BuddyForm />
        <Chat />
        <MapGL />
      </div>
    );
  }
}
