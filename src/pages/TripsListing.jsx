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
  TripNameVisual,
  TripIcon
} from '../elements/profile';

import { ImageSection, Image } from '../elements/tripImages';
import { Stop } from '../elements/stops';
import { Figure, CardImg, Figcaption } from '../elements/figure';

import Scene from '../Scene';
import TripCompleted from '../components/TripCompleted';
import TripImageForm from '../components/TripImageForm';
import TripImageOverlay from '../components/TripImageOverlay';
import PageTransition from '../components/PageTransition';

@inject('WanderersStore', 'UiStore')
@observer
export default class TripsListing extends Component {
  constructor(props) {
    super(props);

    this.scene = null;
  }

  componentWillMount() {
    this.props.WanderersStore.loadTrips();
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

    this.props.WanderersStore.loadTripImages(trip.uuid);
    await this.props.WanderersStore.loadStops(trip.uuid);
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
        <div>
          <ul>
            {WanderersStore.stops.map(stop => (
              <Stop key={stop.id}>
                {stop.place.name},{' '}
                {stop.place.city.country.slice(0, 3).toUpperCase()}
              </Stop>
            ))}
          </ul>
          {trip.completed ? (
            <ImageSection>
              {WanderersStore.tripImages.map(image => (
                <Image
                  key={image.id}
                  src={image.card_image}
                  alt={image.caption || 'trip image'}
                  onClick={e => {
                    e.preventDefault();
                    UiStore.openTripImage = true;
                    UiStore.imageOpened = image;
                  }}
                />
              ))}
            </ImageSection>
          ) : (
            ''
          )}
        </div>
      );
    } else if (UiStore.showSelected === 'edit') {
      return (
        <div>
          <TripCompleted trip={trip} />
          <TripImageForm trip={trip} />
        </div>
      );
    }
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
      <PageTransition>
        <ProfilePage>
          <TripImageOverlay />

          <TripVisualization innerRef={section => (this.section = section)} />

          <UserTrips>
            <TripsList>
              {trips.map(trip => {
                return (
                  <TripsListItem key={trip.uuid}>
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
                    <Link to={`/trips/${trip.uuid}`}>
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

          {WanderersStore.trip && (
            <TripNameVisual>{WanderersStore.trip.name}</TripNameVisual>
          )}

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
        </ProfilePage>
      </PageTransition>
    );
  }
}
