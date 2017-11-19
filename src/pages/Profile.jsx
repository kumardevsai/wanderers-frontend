import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('WanderersStore')
@observer
export default class Profile extends Component {
  render() {
    const trips = this.props.WanderersStore.trips;
    return (
      <div className="profile_page">
        <ul>
          {trips.map(trip => {
            return (
              <li key={trip.id}>
                <Link to={`/trips/${trip.id}`}>{trip.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
