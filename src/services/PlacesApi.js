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
}
