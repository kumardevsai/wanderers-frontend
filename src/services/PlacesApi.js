import { create } from 'apisauce';

export default class PlacesApi {
  constructor() {
    this.api = create({
      baseURL: 'http://localhost:5000',
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
}
