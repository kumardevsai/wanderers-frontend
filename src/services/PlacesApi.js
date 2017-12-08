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

  headers = user_token => ({
    headers: {
      Authorization: `Bearer ${user_token}`
    }
  });

  search = (user_token, lat, lon) => {
    // get info from #places from places-ms
    return this.api.get(
      '/places',
      {
        lat,
        lon
      },
      this.headers(user_token)
    );
  };

  createTrip = (user_token, name) => {
    return this.api.post(
      '/trips',
      {
        name
      },
      this.headers(user_token)
    );
  };

  loadTrip = (user_token, id) => {
    return this.api.get(`/trips/${id}`, {}, this.headers(user_token));
  };

  loadTrips = user_token => {
    return this.api.get(`/trips`, {}, this.headers(user_token));
  };

  sendInvitation = (user_token, email, trip_id) => {
    return this.api.post(
      `/trips/${trip_id}/invitations`,
      {
        email
      },
      this.headers(user_token)
    );
  };

  joinTrip = (user_token, tripId) => {
    return this.api.post(
      `/trips/${tripId}/buddies`,
      {},
      this.headers(user_token)
    );
  };

  loadMessages = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/messages`,
      {},
      this.headers(user_token)
    );
  };

  loadBuddies = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/buddies`,
      {},
      this.headers(user_token)
    );
  };

  addStopToTrip = (user_token, tripId, placeId) => {
    return this.api.post(
      `/trips/${tripId}/stops`,
      { place_id: placeId },
      this.headers(user_token)
    );
  };

  removeStopFromTrip = (user_token, tripId, stopId) => {
    return this.api.delete(
      `/trips/${tripId}/stops/${stopId}`,
      {},
      this.headers(user_token)
    );
  };

  loadStops = (user_token, tripId) => {
    return this.api.get(`/trips/${tripId}/stops`, {}, this.headers(user_token));
  };

  updateTrip = (user_token, tripId, fields) => {
    return this.api.put(`/trips/${tripId}`, fields, this.headers(user_token));
  };

  loadVideoToken = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/video_token`,
      {},
      this.headers(user_token)
    );
  };

  addTripImage = (user_token, tripId, image, caption) => {
    const formData = new FormData();
    formData.append('trip_image[caption]', caption);
    formData.append('trip_image[image]', image);

    return this.api.post(
      `/trips/${tripId}/trip_images`,
      formData,
      this.headers(user_token)
    );
  };

  loadTripImages = (user_token, tripId) => {
    return this.api.get(
      `/trips/${tripId}/trip_images`,
      {},
      this.headers(user_token)
    );
  };
}
