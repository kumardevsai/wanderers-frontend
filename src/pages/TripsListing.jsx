import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

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
                    }}
                  />
                  <Link to={`/trips/${trip.id}`}>
                    <TripIcon src="/edit.svg" alt="edit icon" />
                  </Link>

                  {WanderersStore.trip === trip ? (
                    <ul>
                      {WanderersStore.stops.map(stop => (
                        <li className="stopName" key={stop.id}>
                          {stop.place.name}, {stop.place.city.country}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </TripsListItem>
              );
            })}
          </TripsList>
        </UserTrips>
      </ProfilePage>
    );
  }
}
