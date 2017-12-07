import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import moment from 'moment';

import {
  ProfilePage,
  UserTrips,
  TripVisualization,
  TripsList,
  TripsListItem,
  TripName,
  TripIcon
} from '../elements/profile';

import { Figure, CardImg, Figcaption } from '../elements/figure';

import Scene from '../Scene';

@inject('WanderersStore', 'UiStore')
@observer
export default class TripsListing extends Component {
  constructor(props) {
    super(props);

    this.scene = null;
  }

  componentDidMount() {
    this.hideOnEscape();

    if (this.props.WanderersStore.trip) {
      this.showVisualTrip(this.props.WanderersStore.trip);
    } else if (this.props.WanderersStore.trips.length !== 0) {
      this.showVisualTrip(this.props.WanderersStore.trips[0]);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.WanderersStore.trips.length > 0 &&
      !prevProps.WanderersStore.trip
    ) {
      this.showVisualTrip(prevProps.WanderersStore.trips[0]);
    }
  }

  showVisualTrip = async trip => {
    // check if existing scene
    if (this.scene) {
      this.scene.stop = true;
      this.section.innerHTML = '';
    }

    this.props.WanderersStore.trip = trip;

    await this.props.WanderersStore.loadStops(trip.id);
    this.preloadImages();

    this.scene = new Scene(
      this.section,
      this.props.WanderersStore.stops,
      this.showStopImage,
      this.hideStopImage
    );
  };

  showSelected = trip => {
    const { WanderersStore, UiStore } = this.props;

    if (WanderersStore.trip !== trip) return null;

    if (UiStore.showSelected === 'stops') {
      return (
        <ul>
          {WanderersStore.stops.map(stop => (
            <li className="stopName" key={stop.id}>
              {stop.place.name},{' '}
              {stop.place.city.country.slice(0, 3).toUpperCase()}
            </li>
          ))}
        </ul>
      );
    } else if (UiStore.showSelected === 'edit') {
      return (
        <form>
          <label htmlFor="checkbox">
            {trip.completed ? (
              <span>
                Trip Completed {moment(trip.completed_at).fromNow()}
                <br /> Trip not completed?
              </span>
            ) : (
              'Mark Trip as Completed'
            )}
            <input
              type="checkbox"
              name=""
              id="checkbox"
              checked={trip.completed}
              onChange={e => {
                this.tripCompleted(trip, e);
              }}
            />
          </label>

          {trip.completed ? (
            <div className="rating">
              <input
                type="radio"
                name="rating"
                value="1"
                checked={trip.rating === 1}
                onChange={e => {
                  this.tripRated(trip, e);
                }}
              />{' '}
              1
              <input
                type="radio"
                name="rating"
                value="2"
                checked={trip.rating === 2}
                onChange={e => {
                  this.tripRated(trip, e);
                }}
              />{' '}
              2
              <input
                type="radio"
                name="rating"
                value="3"
                checked={trip.rating === 3}
                onChange={e => {
                  this.tripRated(trip, e);
                }}
              />{' '}
              3
              <input
                type="radio"
                name="rating"
                value="4"
                checked={trip.rating === 4}
                onChange={e => {
                  this.tripRated(trip, e);
                }}
              />{' '}
              4
              <input
                type="radio"
                name="rating"
                value="5"
                checked={trip.rating === 5}
                onChange={e => {
                  this.tripRated(trip, e);
                }}
              />{' '}
              5
            </div>
          ) : (
            ''
          )}
        </form>
      );
    }
  };

  tripCompleted = (trip, e) => {
    this.props.WanderersStore.markTripCompleted(trip, e.target.checked);
  };

  tripRated = (trip, e) => {
    this.props.WanderersStore.markTripRated(trip, parseInt(e.target.value));
  };

  preloadImages = () => {
    this.props.WanderersStore.stops.forEach(stop => {
      if (stop.place.place_images.length > 0) {
        const image = new Image();
        image.src = stop.place.place_images[0];
      }
    });
  };

  hideOnEscape = () => {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.hideStopImage();
      }
    });
  };

  showStopImage = (stopId, x, y) => {
    this.props.UiStore.visualImageVisible = true;
    this.props.UiStore.visualImagePositionX = x - 75;
    this.props.UiStore.visualImagePositionY = y - 75;
    this.props.UiStore.visualImageStop = this.props.WanderersStore.stops.find(
      stop => stop.id === stopId
    );
  };

  hideStopImage = () => {
    this.props.UiStore.visualImageVisible = false;
  };

  render() {
    const { WanderersStore, UiStore } = this.props;
    const trips = WanderersStore.trips;
    const stop = UiStore.visualImageStop;

    return (
      <ProfilePage>
        <TripVisualization innerRef={section => (this.section = section)} />

        {UiStore.visualImageVisible && stop ? (
          <div
            style={{
              position: 'absolute',
              top: UiStore.visualImagePositionY,
              left: UiStore.visualImagePositionX
            }}
          >
            <Figure>
              <CardImg
                src={
                  stop.place.place_images.length > 0
                    ? stop.place.place_images[0].card_image
                    : '/noimg.jpg'
                }
                alt={stop.place.name}
              />
              <Figcaption>{stop.place.name.toUpperCase()}</Figcaption>
            </Figure>
          </div>
        ) : (
          ''
        )}

        <UserTrips>
          <TripsList>
            {trips.map(trip => {
              return (
                <TripsListItem key={trip.id}>
                  <TripName>{trip.name}</TripName>
                  <TripIcon
                    src="/view.svg"
                    alt="view icon"
                    onClick={e => {
                      e.preventDefault();
                      this.showVisualTrip(trip);
                      UiStore.showSelected = 'stops';
                    }}
                  />
                  <Link to={`/trips/${trip.id}`}>
                    <TripIcon src="/world.svg" alt="map icon" />
                  </Link>
                  <TripIcon
                    src="/edit.svg"
                    alt="edit icon"
                    onClick={e => {
                      e.preventDefault();
                      this.showVisualTrip(trip);
                      UiStore.showSelected = 'edit';
                    }}
                  />

                  {this.showSelected(trip)}
                </TripsListItem>
              );
            })}
          </TripsList>
        </UserTrips>
      </ProfilePage>
    );
  }
}
