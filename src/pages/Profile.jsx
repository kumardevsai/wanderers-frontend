import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import {
  ProfilePage,
  UserTrips,
  TripVisualization,
  TripsList,
  TripsListItem,
  ListItemLine,
  TripLink
} from '../elements/profile';
import { Heading2 } from '../elements/form';

@inject('WanderersStore')
@observer
export default class Profile extends Component {
  render() {
    const trips = this.props.WanderersStore.trips;
    return (
      <ProfilePage>
        <TripVisualization />

        <UserTrips>
          <Heading2>Your Trips</Heading2>
          <TripsList>
            {trips.map(trip => {
              return (
                <TripsListItem key={trip.id}>
                  <TripLink to={`/trips/${trip.id}`}>{trip.name}</TripLink>
                </TripsListItem>
              );
            })}
            <ListItemLine />
          </TripsList>
        </UserTrips>
      </ProfilePage>
    );
  }
}
