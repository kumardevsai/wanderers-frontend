import { create } from 'apisauce';

import Hosts from './Hosts';

export default class PlacesApi {
  constructor() {
    this.api = create({
      baseURL: Hosts.placesHost(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  search = (user_token, lat, lon) => {
    // get info from #places from places-ms
    return this.api.get(
      '/places',
      {
        lat,
        lon
      },
      {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      }
    );
  };

  createTrip = (user_token, name) => {
    console.log(name);
    return this.api.post(
      '/trips',
      {
        name
      },
      {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      }
    );
  };

  loadTrip = (user_token, id) => {
    return this.api.get(
      `/trips/${id}`,
      {},
      { headers: { Authorization: `Bearer ${user_token}` } }
    );
  };

  loadTrips = user_token => {
    return this.api.get(
      `/trips`,
      {},
      { headers: { Authorization: `Bearer ${user_token}` } }
    );
  };

  sendInvitation = (user_token, email, trip_id) => {
    return this.api.post(
      `/trips/${trip_id}/invitations`,
      {
        email
      },
      {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      }
    );
  };

  joinTrip = (user_token, tripId) => {
    return this.api.post(
      `/trips/${tripId}/buddies`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      }
    );
  };

  loadMessages = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/messages`,
      {},
      { headers: { Authorization: `Bearer ${user_token}` } }
    );
  };

  loadBuddies = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/buddies`,
      {},
      { headers: { Authorization: `Bearer ${user_token}` } }
    );
  };
}
