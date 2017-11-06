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
    // post to #places from places-ms
    return this.api.get('/places', {
      lat,
      lon
    });
  };
}
