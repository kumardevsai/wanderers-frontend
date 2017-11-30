import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer, inject } from 'mobx-react';

@inject('WanderersStore')
@observer
export default class PopupAction extends Component {
  static propTypes = {
    place: PropTypes.object.isRequired
  };

  render() {
    const { WanderersStore } = this.props;
    const place = this.props.place;
    const stop = WanderersStore.stops.find(stop => stop.place.id === place.id);

    if (!WanderersStore.trip) {
      return '';
    } else if (stop) {
      return (
        <button
          className="popupBtn"
          onClick={e => {
            e.preventDefault();
            WanderersStore.removeStopFromTrip(stop.id);
          }}
        >
          REMOVE STOP
        </button>
      );
    } else {
      return (
        <button
          className="popupBtn"
          onClick={e => {
            e.preventDefault();
            WanderersStore.addStopToTrip(place.id);
          }}
        >
          ADD STOP
        </button>
      );
    }
  }
}
