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

  search = (user_token, lat, lon, type) => {
    // get info from #places from places-ms
    return this.api.get(
      '/places',
      {
        lat,
        lon,
        type
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

  loadTrip = (user_token, uuid) => {
    return this.api.get(`/trips/${uuid}`, {}, this.headers(user_token));
  };

  loadTrips = user_token => {
    return this.api.get(`/trips`, {}, this.headers(user_token));
  };

  sendInvitation = (user_token, email, tripUuid) => {
    return this.api.post(
      `/trips/${tripUuid}/invitations`,
      {
        email
      },
      this.headers(user_token)
    );
  };

  joinTrip = (user_token, tripUuid) => {
    return this.api.post(
      //call to #create
      `/trips/${tripUuid}/buddies`,
      {},
      this.headers(user_token)
    );
  };

  loadMessages = (user_token, tripUuid) => {
    return this.api.get(
      `/trips/${tripUuid}/messages`,
      {},
      this.headers(user_token)
    );
  };

  loadBuddies = (user_token, tripUuid) => {
    return this.api.get(
      `/trips/${tripUuid}/buddies`,
      {},
      this.headers(user_token)
    );
  };

  addStopToTrip = (user_token, tripUuid, placeId) => {
    return this.api.post(
      `/trips/${tripUuid}/stops`,
      { place_id: placeId },
      this.headers(user_token)
    );
  };

  removeStopFromTrip = (user_token, tripUuid, stopId) => {
    return this.api.delete(
      `/trips/${tripUuid}/stops/${stopId}`,
      {},
      this.headers(user_token)
    );
  };

  loadStops = (user_token, tripUuid) => {
    return this.api.get(
      `/trips/${tripUuid}/stops`,
      {},
      this.headers(user_token)
    );
  };

  updateTrip = (user_token, tripUuid, fields) => {
    return this.api.put(`/trips/${tripUuid}`, fields, this.headers(user_token));
  };

  loadVideoToken = (user_token, tripUuid) => {
    return this.api.get(
      `/trips/${tripUuid}/video_token`,
      {},
      this.headers(user_token)
    );
  };

  addTripImage = (user_token, tripUuid, image, caption) => {
    const formData = new FormData();
    formData.append('trip_image[caption]', caption);
    formData.append('trip_image[image]', image);

    return this.api.post(
      `/trips/${tripUuid}/trip_images`,
      formData,
      this.headers(user_token)
    );
  };

  loadTripImages = (user_token, tripUuid) => {
    return this.api.get(
      `/trips/${tripUuid}/trip_images`,
      {},
      this.headers(user_token)
    );
  };
}
