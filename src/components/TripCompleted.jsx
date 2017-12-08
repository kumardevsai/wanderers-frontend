import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PropTypes from 'prop-types';

import moment from 'moment';

import { CompletedText, CheckBox, Radio } from '../elements/tripCompleted';

@inject('WanderersStore')
@observer
export default class TripCompleted extends Component {
  static propTypes = {
    trip: PropTypes.shape({
      completed_at: PropTypes.string,
      completed: PropTypes.bool.isRequired,
      rating: PropTypes.number
    }).isRequired
  };

  tripCompleted = (trip, e) => {
    this.props.WanderersStore.markTripCompleted(trip, e.target.checked);
  };

  tripRated = (trip, e) => {
    this.props.WanderersStore.markTripRated(trip, parseInt(e.target.value, 10));
  };

  render() {
    const { WanderersStore, trip } = this.props;

    return (
      <form>
        <label htmlFor="checkbox">
          {trip.completed ? (
            <CompletedText>
              Trip Completed {moment(trip.completed_at).fromNow()}
              <br /> Trip not completed?
            </CompletedText>
          ) : (
            'Mark Trip as Completed'
          )}
          <CheckBox
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
            <Radio
              type="radio"
              name="rating"
              value="1"
              checked={trip.rating === 1}
              onChange={e => {
                this.tripRated(trip, e);
              }}
            />{' '}
            1
            <Radio
              type="radio"
              name="rating"
              value="2"
              checked={trip.rating === 2}
              onChange={e => {
                this.tripRated(trip, e);
              }}
            />{' '}
            2
            <Radio
              type="radio"
              name="rating"
              value="3"
              checked={trip.rating === 3}
              onChange={e => {
                this.tripRated(trip, e);
              }}
            />{' '}
            3
            <Radio
              type="radio"
              name="rating"
              value="4"
              checked={trip.rating === 4}
              onChange={e => {
                this.tripRated(trip, e);
              }}
            />{' '}
            4
            <Radio
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
}
